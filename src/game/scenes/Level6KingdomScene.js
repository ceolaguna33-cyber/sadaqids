import Phaser from 'phaser';
import { BaseMinigameScene } from './BaseMinigameScene';
import { SVG_ASSETS, preloadSvgTexture } from '../assets/svgAssets';

/**
 * LEVEL 6 — NEGERI KEBAIKAN: Misi Terpadu (Grand Finale)
 * Mekanik: Misi Terpadu 4 Pilar Kebaikan (Sekolah, Klinik, Masjid, Taman Kota)
 * Nilai Edukasi: Integrasi holistik seluruh nilai syariah (Sedekah, Infak, Wakaf, Prioritas, Amanah)
 */
export class Level6KingdomScene extends BaseMinigameScene {
  constructor() {
    super('Level6KingdomScene');
  }

  create() {
    super.create();

    this.allocations = {
      opt_sekolah: 0,
      opt_klinik: 0,
      opt_masjid: 0,
      opt_taman_kota: 0,
    };
    this.totalSpent = 0;

    // 1. Peta Masterplan Alun-Alun Negeri Kebaikan
    this.createKingdomMapEnvironment();

    // 2. Empat Zona Distrik Pembangunan
    this.createDistrictZones();

    // 3. Baki Empat Pilar Kebaikan di Bawah
    this.createInventoryTray();

    this.broadcastGameState('Misi Terpadu: Tempatkan Empat Pilar Kebaikan ke Distrik Negeri yang Tepat!');
  }

  createKingdomMapEnvironment() {
    const { width, height } = this.scale;

    // Latar Belakang Lapangan Kerajaan Hijau Zamrud
    const bg = this.add.graphics();
    bg.fillStyle(0xECFDF5, 1);
    bg.fillRect(0, 0, width, height - 130);

    // Jalan Setapak Melingkar Emas
    bg.lineStyle(24, 0xFEF3C7, 1);
    bg.strokeCircle(400, 160, 110);
    bg.lineStyle(2, 0xD97706, 0.4);
    bg.strokeCircle(400, 160, 122);
    bg.strokeCircle(400, 160, 98);

    // Alun-Alun Pusat: Pohon Kebaikan Paripurna
    this.centerTreeGfx = this.add.graphics();
    this.centerTreeGfx.fillStyle(0x059669, 1);
    this.centerTreeGfx.fillCircle(400, 160, 36);
    this.centerTreeGfx.lineStyle(3, 0xF59E0B, 1);
    this.centerTreeGfx.strokeCircle(400, 160, 36);

    this.treeLabel = this.add.text(400, 160, '🌳\nPOHON', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#FFFFFF',
      align: 'center',
    }).setOrigin(0.5);

    // Spanduk Judul Grand Finale
    const banner = this.add.graphics();
    banner.fillStyle(0x064E3B, 1);
    banner.fillRoundedRect(160, 10, 480, 34, 8);
    banner.lineStyle(2, 0x10B981, 1);
    banner.strokeRoundedRect(160, 10, 480, 34, 8);

    this.add.text(400, 27, 'MASTERPLAN NEGERI KEBAIKAN: EMPAT PILAR MASA DEPAN', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FEF3C7',
    }).setOrigin(0.5);
  }

  createDistrictZones() {
    const districts = [
      // Barat: Pendidikan (Sekolah)
      { id: 'zone_sekolah', aidKey: 'opt_sekolah', acceptedItem: 'pilar_sekolah', title: 'Distrik Pendidikan', cost: 50, x: 170, y: 160, color: 0x2563EB },
      // Utara: Kesehatan (Klinik)
      { id: 'zone_klinik', aidKey: 'opt_klinik', acceptedItem: 'pilar_klinik', title: 'Distrik Kesehatan', cost: 30, x: 400, y: 75, color: 0x059669 },
      // Timur: Rohani (Masjid)
      { id: 'zone_masjid', aidKey: 'opt_masjid', acceptedItem: 'pilar_masjid', title: 'Distrik Ibadah', cost: 20, x: 630, y: 160, color: 0xD97706 },
      // Selatan: Hijau Publik (Taman Kota)
      { id: 'zone_taman', aidKey: 'opt_taman_kota', acceptedItem: 'pilar_taman', title: 'Distrik Ruang Hijau', cost: 20, x: 400, y: 245, color: 0x10B981 },
    ];

    districts.forEach((d) => {
      const zone = this.add.zone(d.x, d.y, 130, 95).setRectangleDropZone(130, 95);
      zone.zoneId = d.id;
      zone.aidKey = d.aidKey;
      zone.acceptedItemId = d.acceptedItem;
      zone.cost = d.cost;
      zone.isOccupied = false;

      const box = this.add.graphics();
      box.fillStyle(0xFFFFFF, 0.9);
      box.fillRoundedRect(d.x - 65, d.y - 47, 130, 95, 8);
      box.lineStyle(2, d.color, 0.8);
      box.strokeRoundedRect(d.x - 65, d.y - 47, 130, 95, 8);
      zone.visualBox = box;

      const label = this.add.text(d.x, d.y - 32, d.title, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '10px',
        color: `#${d.color.toString(16).padStart(6, '0')}`,
        fontStyle: 'bold',
      }).setOrigin(0.5);
      zone.label = label;

      zone.acceptsItem = (item) => item.itemId === d.acceptedItem;
      zone.setHoverState = (s) => {
        box.clear();
        box.fillStyle(0xFFFFFF, 0.9);
        box.fillRoundedRect(d.x - 65, d.y - 47, 130, 95, 8);
        box.lineStyle(s === 'valid' ? 3.5 : 2, s === 'valid' ? 0x10B981 : d.color, 0.8);
        box.strokeRoundedRect(d.x - 65, d.y - 47, 130, 95, 8);
      };

      zone.setInteractive();
      zone.on('pointerdown', () => {
        if (this.selectedItem) {
          if (zone.acceptsItem(this.selectedItem)) {
            this.handleItemDrop(this.selectedItem, zone);
          } else {
            this.returnItemToOrigin(this.selectedItem, 'Cocokkan pilar dengan distrik yang sesuai di peta!');
          }
          this.deselectCurrentItem();
        }
      });

      this.dropZones.push(zone);
    });
  }

  createInventoryTray() {
    const { width, height } = this.scale;
    const trayY = height - 60;

    const trayBg = this.add.graphics();
    trayBg.fillStyle(0x0F172A, 0.95);
    trayBg.fillRoundedRect(20, trayY - 55, width - 40, 105, 16);
    trayBg.lineStyle(3, 0x334155, 1);
    trayBg.strokeRoundedRect(20, trayY - 55, width - 40, 105, 16);

    this.add.text(45, trayY - 45, '👑 EMPAT PILAR KEBAIKAN NEGERI (Seret ke Zona Distrik Masing-Masing):', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#FDE68A',
    });

    const items = [
      { id: 'pilar_sekolah', aidKey: 'opt_sekolah', title: 'Gedung Sekolah', cost: 50, x: 120, y: trayY + 5 },
      { id: 'pilar_klinik', aidKey: 'opt_klinik', title: 'Klinik Sehat', cost: 30, x: 290, y: trayY + 5 },
      { id: 'pilar_masjid', aidKey: 'opt_masjid', title: 'Masjid Warga', cost: 20, x: 460, y: trayY + 5 },
      { id: 'pilar_taman', aidKey: 'opt_taman_kota', title: 'Taman Kota', cost: 20, x: 630, y: trayY + 5 },
    ];

    items.forEach((d) => {
      const container = this.add.container(d.x, d.y);
      container.setSize(80, 80);
      container.setInteractive({ draggable: true, useHandCursor: true });

      container.itemId = d.id;
      container.aidKey = d.aidKey;
      container.itemTitle = d.title;
      container.cost = d.cost;
      container.originX = d.x;
      container.originY = d.y;
      container.originalScale = 0.9;
      container.setScale(0.9);

      const sprite = this.add.image(0, -6, d.id);
      sprite.setScale(0.75);
      container.add(sprite);

      const tag = this.add.graphics();
      tag.fillStyle(0x1E293B, 0.9);
      tag.fillRoundedRect(-44, 22, 88, 18, 5);
      tag.lineStyle(1.5, 0x10B981, 1);
      tag.strokeRoundedRect(-44, 22, 88, 18, 5);
      container.add(tag);

      const label = this.add.text(0, 31, `${d.cost} Koin`, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '10px',
        fontStyle: 'bold',
        color: '#A7F3D0',
      }).setOrigin(0.5);
      container.add(label);

      container.on('pointerdown', (pointer) => {
        if (pointer.getDistance() < 5) {
          this.selectItemForTap(container);
        }
      });

      this.input.setDraggable(container);
      this.draggableItems.push(container);
    });
  }

  handleItemDrop(item, zone) {
    if (!zone.acceptsItem(item)) {
      this.returnItemToOrigin(item, 'Pilar ini kurang pas di distrik ini.');
      return;
    }

    if (zone.isOccupied) {
      this.returnItemToOrigin(item, 'Distrik ini sudah terbangun pilar.');
      return;
    }

    const remaining = this.initialCoins - this.totalSpent;
    if (remaining < item.cost) {
      this.returnItemToOrigin(item, `Koin Kebaikan tersisa (${remaining}) tidak mencukupi untuk pilar ini.`);
      return;
    }

    this.playSound('stamp');
    this.spawnSparkleBurst(zone.x, zone.y, 10);

    zone.isOccupied = true;
    zone.placedItem = item;

    this.allocations[zone.aidKey] = item.cost;
    this.totalSpent = Object.values(this.allocations).reduce((a, b) => a + b, 0);

    this.tweens.add({
      targets: item,
      x: zone.x,
      y: zone.y,
      scale: 0.95,
      duration: this.isReducedMotion ? 50 : 250,
      ease: 'Back.easeOut',
    });

    this.createReturnButton(item, zone);
    this.updateWorldFeedback();
  }

  createReturnButton(item, zone) {
    const returnBtn = this.add.container(zone.x + 40, zone.y - 35);
    returnBtn.setSize(22, 22);
    returnBtn.setDepth(180);

    const bg = this.add.graphics();
    bg.fillStyle(0xEF4444, 1);
    bg.fillCircle(0, 0, 10);
    returnBtn.add(bg);

    const txt = this.add.text(0, 0, '↩', {
      fontSize: '11px',
      color: '#FFFFFF',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    returnBtn.add(txt);

    returnBtn.setInteractive({ useHandCursor: true });
    returnBtn.on('pointerdown', () => {
      this.playSound('tap');
      returnBtn.destroy();

      zone.isOccupied = false;
      zone.placedItem = null;

      this.allocations[zone.aidKey] = 0;
      this.totalSpent = Object.values(this.allocations).reduce((a, b) => a + b, 0);

      this.tweens.add({
        targets: item,
        x: item.originX,
        y: item.originY,
        scale: item.originalScale,
        duration: this.isReducedMotion ? 50 : 250,
        ease: 'Back.easeOut',
      });

      this.updateWorldFeedback();
    });

    item.returnBtn = returnBtn;
  }

  updateWorldFeedback() {
    const hasSekolah = this.allocations['opt_sekolah'] >= 50;
    const hasKlinik = this.allocations['opt_klinik'] >= 30;
    const hasMasjid = this.allocations['opt_masjid'] >= 20;

    // Kriteria selesai pilar utama terpenuhi (Sekolah + Klinik minimal)
    const canComplete = hasSekolah && hasKlinik;

    if (canComplete && hasMasjid) {
      this.centerTreeGfx.clear();
      this.centerTreeGfx.fillStyle(0xF59E0B, 1);
      this.centerTreeGfx.fillCircle(400, 160, 42);
      this.centerTreeGfx.lineStyle(4, 0xFEF08A, 1);
      this.centerTreeGfx.strokeCircle(400, 160, 42);
      this.treeLabel.setText('🌟\nPARIPURNA');
      this.treeLabel.setColor('#78350F');
    }

    const remaining = this.initialCoins - this.totalSpent;
    this.emitStateUpdate({
      allocations: { ...this.allocations },
      coinsSpent: this.totalSpent,
      remainingCoins: remaining,
      canComplete,
      activeTip: canComplete
        ? 'Selamat! Empat Pilar Masa Depan Negeri Kebaikan telah berdiri megah dan bercahaya!'
        : 'Bangun Gedung Sekolah dan Klinik Sehat sebagai pilar pokok masa depan negeri!',
      placedCount: Object.values(this.allocations).filter((v) => v > 0).length,
    });
  }

  broadcastGameState(tip) {
    this.updateWorldFeedback();
  }
}
