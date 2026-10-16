import Phaser from 'phaser';
import { preloadAllSvgTextures } from '../assets/svgAssets';

/**
 * Base Scene untuk Semua Minigame Literasi Keuangan Sosial Syariah
 * Menyediakan:
 * - Dukungan Drag & Drop ganda (Mouse & Layar Sentuh)
 * - Mode Aksesibilitas Tap-to-Select (ketuk objek -> ketuk target)
 * - Jembatan Event ke React (state alokasi koin & penyelesaian)
 * - Efek Partikel & Animasi Bouncy Whimsical
 * - Pembersihan Memori yang Aman (Lifecycle Cleanup)
 */
export class BaseMinigameScene extends Phaser.Scene {
  constructor(key) {
    super({ key });
    this.selectedItem = null;
    this.dropZones = [];
    this.draggableItems = [];
    this.placedCount = 0;
  }

  init(data) {
    this.mission = this.registry.get('mission') || data?.mission || {};
    this.bridge = this.registry.get('bridge') || data?.bridge || {};
    this.isReducedMotion = Boolean(this.registry.get('isReducedMotion') ?? data?.isReducedMotion);
    this.initialCoins = this.mission?.virtualCurrency?.initialCoins || 100;
  }

  preload() {
    // Muat semua aset SVG via Phaser native load pipeline
    preloadAllSvgTextures(this);
  }

  create() {
    // Bersihkan state lokal
    this.selectedItem = null;
    this.dropZones = [];
    this.draggableItems = [];

    // Pointer event untuk tap-to-select fallback
    this.input.on('pointerdown', (pointer, currentlyOver) => {
      // Jika mengetuk ruang kosong, batalkan seleksi
      if (currentlyOver.length === 0 && this.selectedItem) {
        this.deselectCurrentItem();
      }
    });

    // Setup input drag events
    this.setupDragEvents();
  }

  /**
   * Mengatur interaksi drag-and-drop mouse dan sentuhan layar
   */
  setupDragEvents() {
    this.input.on('dragstart', (pointer, gameObject) => {
      if (this.selectedItem && this.selectedItem !== gameObject) {
        this.deselectCurrentItem();
      }
      gameObject.setDepth(150);
      this.playSound('tap');

      if (!this.isReducedMotion) {
        this.tweens.add({
          targets: gameObject,
          scale: gameObject.originalScale * 1.15,
          duration: 120,
          ease: 'Sine.easeOut',
        });
      }
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;

      // Periksa zona target yang disentuh
      this.highlightHoveredZone(dragX, dragY, gameObject);
    });

    this.input.on('dragend', (pointer, gameObject, dropped) => {
      gameObject.setDepth(50);
      if (!this.isReducedMotion) {
        this.tweens.add({
          targets: gameObject,
          scale: gameObject.originalScale,
          duration: 150,
        });
      }

      // Reset hover semua zona
      this.clearZoneHighlights();

      // Cari zona yang berada di bawah posisi lepas
      const targetZone = this.findOverlappingZone(gameObject.x, gameObject.y, gameObject);

      if (targetZone) {
        this.handleItemDrop(gameObject, targetZone);
      } else {
        // Kembalikan ke posisi awal
        this.returnItemToOrigin(gameObject);
      }
    });
  }

  /**
   * Pilihan alternatif Tap-to-Select untuk aksesibilitas
   */
  selectItemForTap(item) {
    if (this.selectedItem === item) {
      this.deselectCurrentItem();
      return;
    }

    if (this.selectedItem) {
      this.deselectCurrentItem();
    }

    this.selectedItem = item;
    item.setDepth(160);
    this.playSound('tap');

    // Visual indikator terpilih
    if (!this.isReducedMotion) {
      item.selectTween = this.tweens.add({
        targets: item,
        scale: item.originalScale * 1.2,
        yoyo: true,
        repeat: -1,
        duration: 400,
        ease: 'Sine.easeInOut',
      });
    }

    // Tampilkan bantuan ke React HUD
    this.emitNotification(`Benda "${item.itemTitle}" dipilih! Ketuk target lokasi yang sesuai di panggung.`);
  }

  deselectCurrentItem() {
    if (!this.selectedItem) return;
    if (this.selectedItem.selectTween) {
      this.selectedItem.selectTween.stop();
      this.selectedItem.selectTween = null;
    }
    this.selectedItem.setScale(this.selectedItem.originalScale);
    this.selectedItem.setDepth(50);
    this.selectedItem = null;
  }

  /**
   * Menyorot drop zone yang sedang disentuh saat drag
   */
  highlightHoveredZone(x, y, item) {
    for (const zone of this.dropZones) {
      if (zone.isOccupied && !zone.allowMultiple) continue;
      const bounds = zone.getBounds ? zone.getBounds() : new Phaser.Geom.Rectangle(zone.x - zone.width/2, zone.y - zone.height/2, zone.width, zone.height);
      const isInside = Phaser.Geom.Rectangle.Contains(bounds, x, y);

      if (isInside) {
        const isValid = zone.acceptsItem ? zone.acceptsItem(item) : true;
        zone.setHoverState(isValid ? 'valid' : 'invalid');
      } else {
        zone.setHoverState('idle');
      }
    }
  }

  clearZoneHighlights() {
    for (const zone of this.dropZones) {
      zone.setHoverState('idle');
    }
  }

  findOverlappingZone(x, y, item) {
    for (const zone of this.dropZones) {
      if (zone.isOccupied && !zone.allowMultiple) continue;
      const bounds = zone.getBounds ? zone.getBounds() : new Phaser.Geom.Rectangle(zone.x - zone.width/2, zone.y - zone.height/2, zone.width, zone.height);
      if (Phaser.Geom.Rectangle.Contains(bounds, x, y)) {
        return zone;
      }
    }
    return null;
  }

  returnItemToOrigin(item, reasonText = null) {
    this.playSound('whoosh');
    if (reasonText) {
      this.emitNotification(reasonText, 'warning');
    }

    this.tweens.add({
      targets: item,
      x: item.originX,
      y: item.originY,
      duration: this.isReducedMotion ? 50 : 280,
      ease: 'Back.easeOut',
    });
  }

  /**
   * Pemicu efek partikel letupan bintang emas saat berhasil
   */
  spawnSparkleBurst(x, y, count = 8) {
    if (this.isReducedMotion) return;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const speed = 60 + Math.random() * 60;
      const sparkle = this.add.image(x, y, 'sparkle');
      sparkle.setScale(0.7 + Math.random() * 0.5);
      sparkle.setDepth(200);

      this.tweens.add({
        targets: sparkle,
        x: x + Math.cos(angle) * speed,
        y: y + Math.sin(angle) * speed,
        alpha: 0,
        scale: 0.1,
        duration: 600 + Math.random() * 300,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          sparkle.destroy();
        },
      });
    }
  }

  // Jembatan komunikasi ke React
  playSound(type) {
    if (this.bridge?.playSound) {
      this.bridge.playSound(type);
    }
  }

  emitStateUpdate(state) {
    if (this.bridge?.onStateUpdate) {
      this.bridge.onStateUpdate(state);
    }
  }

  emitNotification(message, type = 'info') {
    if (this.bridge?.notify) {
      this.bridge.notify(message, type);
    }
  }
}
