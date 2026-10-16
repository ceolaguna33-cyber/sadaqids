import Phaser from 'phaser';
import { BaseMinigameScene } from './BaseMinigameScene';
import { SVG_ASSETS, preloadSvgTexture } from '../assets/svgAssets';

/**
 * LEVEL 2 — KAMPUNG SEHAT: Distribusikan Infak
 * Mekanik: Memilah dan mendistribusikan barang bantuan ke 2 posko berbeda (Dapur Umum vs Pos Sanitasi)
 * Nilai Edukasi: Infak mendukung kemaslahatan bersama secara tepat sasaran
 */
export class Level2DistributionScene extends BaseMinigameScene {
  constructor() {
    super('Level2DistributionScene');
  }

  create() {
    super.create();

    this.allocations = {
      opt_pangan: 0,
      opt_sanitasi: 0,
      opt_camilan: 0,
    };
    this.totalSpent = 0;

    // 1. Lingkungan Posko Kampung Sehat
    this.createEnvironment();

    // 2. Drop Zones: Dapur Umum (Kiri) vs Pos Sanitasi (Kanan)
    this.createDistributionZones();

    // 3. Baki Persediaan Bantuan di Bawah
    this.createInventoryTray();

    this.broadcastGameState('Pilahlah bantuan: Makanan ke Dapur Umum, perlengkapan bersih ke Pos Sanitasi!');
  }

  createEnvironment() {
    const { width, height } = this.scale;

    // Latar Belakang Tenda Posko Desa
    const bg = this.add.graphics();
    bg.fillStyle(0xF0FDF4, 1);
    bg.fillRect(0, 0, width, height - 130);

    // Rumput & Halaman Posko
    bg.fillStyle(0x059669, 1);
    bg.fillRect(0, height - 170, width, 40);

    // Spanduk Posko Kampung Sehat
    const banner = this.add.graphics();
    banner.fillStyle(0x047857, 1);
    banner.fillRoundedRect(220, 15, 360, 42, 8);
    banner.lineStyle(3, 0x064E3B, 1);
    banner.strokeRoundedRect(220, 15, 360, 42, 8);

    this.add.text(400, 36, 'POSKO INFAK KAMPUNG SEHAT', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#FEF3C7',
    }).setOrigin(0.5);
  }

  createDistributionZones() {
    // -----------------------------------------------------------------------
    // ZONA 1: DAPUR UMUM POSKO (Sasaran: Beras & Sayuran Gizi)
    // -----------------------------------------------------------------------
    const kitchenGfx = this.add.graphics();
    kitchenGfx.fillStyle(0xFEF3C7, 1);
    kitchenGfx.fillRoundedRect(40, 75, 330, 215, 12);
    kitchenGfx.lineStyle(3, 0xD97706, 1);
    kitchenGfx.strokeRoundedRect(40, 75, 330, 215, 12);

    // Kuali Masak Besar & Meja Dapur
    kitchenGfx.fillStyle(0x78350F, 1);
    kitchenGfx.fillRect(55, 230, 300, 18);
    kitchenGfx.fillStyle(0x64748B, 1);
    kitchenGfx.fillEllipse(120, 215, 50, 25);
    kitchenGfx.fillStyle(0x475569, 1);
    kitchenGfx.fillEllipse(120, 210, 44, 16);

    this.add.text(205, 95, '🍲 DAPUR UMUM GIZI', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#92400E',
    }).setOrigin(0.5);

    this.kitchenSubtext = this.add.text(205, 118, 'Butuh: Beras & Sayur Sehat (Target 50 Koin)', {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: '11px',
      color: '#B45309',
    }).setOrigin(0.5);

    // Drop zone dapur
    const zoneDapur = this.add.zone(205, 180, 310, 110).setRectangleDropZone(310, 110);
    zoneDapur.zoneId = 'zone_dapur';
    zoneDapur.category = 'pangan';
    zoneDapur.cost = 50;
    zoneDapur.aidOptionId = 'opt_pangan';
    zoneDapur.acceptsItem = (item) => item.category === 'pangan';

    const zoneDapurBox = this.add.graphics();
    zoneDapurBox.lineStyle(2, 0xD97706, 0.6);
    zoneDapurBox.strokeRoundedRect(50, 125, 310, 110, 8);
    zoneDapur.visualBox = zoneDapurBox;

    zoneDapur.setHoverState = (state) => {
      zoneDapurBox.clear();
      if (state === 'valid') {
        zoneDapurBox.lineStyle(4, 0x10B981, 1);
        zoneDapurBox.strokeRoundedRect(50, 125, 310, 110, 8);
      } else if (state === 'invalid') {
        zoneDapurBox.lineStyle(4, 0xEF4444, 1);
        zoneDapurBox.strokeRoundedRect(50, 125, 310, 110, 8);
      } else {
        zoneDapurBox.lineStyle(2, 0xD97706, 0.6);
        zoneDapurBox.strokeRoundedRect(50, 125, 310, 110, 8);
      }
    };

    zoneDapur.setInteractive();
    zoneDapur.on('pointerdown', () => {
      if (this.selectedItem) {
        if (zoneDapur.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, zoneDapur);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Sabun jangan masuk ke dapur masakan ya! Arahkan ke Pos Sanitasi.');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(zoneDapur);
    this.zoneDapur = zoneDapur;

    // -----------------------------------------------------------------------
    // ZONA 2: POS SANITASI & AIR BERSIH (Sasaran: Sabun & Filter Air)
    // -----------------------------------------------------------------------
    const sanitasiGfx = this.add.graphics();
    sanitasiGfx.fillStyle(0xEFF6FF, 1);
    sanitasiGfx.fillRoundedRect(430, 75, 330, 215, 12);
    sanitasiGfx.lineStyle(3, 0x2563EB, 1);
    sanitasiGfx.strokeRoundedRect(430, 75, 330, 215, 12);

    // Bak Air Bersih & Wastafel
    sanitasiGfx.fillStyle(0x78350F, 1);
    sanitasiGfx.fillRect(445, 230, 300, 18);
    sanitasiGfx.fillStyle(0x38BDF8, 1);
    sanitasiGfx.fillRoundedRect(500, 195, 70, 35, 6);
    sanitasiGfx.fillStyle(0x93C5FD, 1);
    sanitasiGfx.fillCircle(535, 205, 8);

    this.add.text(595, 95, '🚿 POS SANITASI & AIR', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#1E40AF',
    }).setOrigin(0.5);

    this.sanitasiSubtext = this.add.text(595, 118, 'Butuh: Sabun & Air Bersih (Target 40 Koin)', {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: '11px',
      color: '#2563EB',
    }).setOrigin(0.5);

    // Drop zone sanitasi
    const zoneSanitasi = this.add.zone(595, 180, 310, 110).setRectangleDropZone(310, 110);
    zoneSanitasi.zoneId = 'zone_sanitasi';
    zoneSanitasi.category = 'sanitasi';
    zoneSanitasi.cost = 40;
    zoneSanitasi.aidOptionId = 'opt_sanitasi';
    zoneSanitasi.acceptsItem = (item) => item.category === 'sanitasi';

    const zoneSanitasiBox = this.add.graphics();
    zoneSanitasiBox.lineStyle(2, 0x2563EB, 0.6);
    zoneSanitasiBox.strokeRoundedRect(440, 125, 310, 110, 8);
    zoneSanitasi.visualBox = zoneSanitasiBox;

    zoneSanitasi.setHoverState = (state) => {
      zoneSanitasiBox.clear();
      if (state === 'valid') {
        zoneSanitasiBox.lineStyle(4, 0x10B981, 1);
        zoneSanitasiBox.strokeRoundedRect(440, 125, 310, 110, 8);
      } else if (state === 'invalid') {
        zoneSanitasiBox.lineStyle(4, 0xEF4444, 1);
        zoneSanitasiBox.strokeRoundedRect(440, 125, 310, 110, 8);
      } else {
        zoneSanitasiBox.lineStyle(2, 0x2563EB, 0.6);
        zoneSanitasiBox.strokeRoundedRect(440, 125, 310, 110, 8);
      }
    };

    zoneSanitasi.setInteractive();
    zoneSanitasi.on('pointerdown', () => {
      if (this.selectedItem) {
        if (zoneSanitasi.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, zoneSanitasi);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Beras dan sayur untuk Dapur Umum ya, bukan pos sanitasi!');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(zoneSanitasi);
    this.zoneSanitasi = zoneSanitasi;
  }

  createInventoryTray() {
    const { width, height } = this.scale;
    const trayY = height - 60;

    const trayBg = this.add.graphics();
    trayBg.fillStyle(0x0F172A, 0.95);
    trayBg.fillRoundedRect(20, trayY - 55, width - 40, 105, 16);
    trayBg.lineStyle(3, 0x334155, 1);
    trayBg.strokeRoundedRect(20, trayY - 55, width - 40, 105, 16);

    this.add.text(45, trayY - 45, '📦 PILAH & DISTRIBUSIKAN BARANG INFAK KE TUJUAN YANG BENAR:', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#6EE7B7',
    });

    const items = [
      { id: 'item_beras', title: 'Karung Beras', cost: 30, category: 'pangan', x: 140, y: trayY + 5 },
      { id: 'item_sayur', title: 'Sayur Gizi', cost: 20, category: 'pangan', x: 310, y: trayY + 5 },
      { id: 'item_sabun', title: 'Sabun Mandi', cost: 20, category: 'sanitasi', x: 490, y: trayY + 5 },
      { id: 'item_filter_air', title: 'Filter Air Bersih', cost: 20, category: 'sanitasi', x: 660, y: trayY + 5 },
    ];

    items.forEach((d) => {
      const container = this.add.container(d.x, d.y);
      container.setSize(80, 80);
      container.setInteractive({ draggable: true, useHandCursor: true });

      container.itemId = d.id;
      container.itemTitle = d.title;
      container.cost = d.cost;
      container.category = d.category;
      container.originX = d.x;
      container.originY = d.y;
      container.originalScale = 0.9;
      container.setScale(0.9);

      const sprite = this.add.image(0, -6, d.id);
      sprite.setScale(0.75);
      container.add(sprite);

      // Label Harga
      const tag = this.add.graphics();
      tag.fillStyle(0x1E293B, 0.9);
      tag.fillRoundedRect(-42, 22, 84, 18, 5);
      tag.lineStyle(1.5, 0x10B981, 1);
      tag.strokeRoundedRect(-42, 22, 84, 18, 5);
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
      if (item.category === 'sanitasi') {
        this.returnItemToOrigin(item, 'Sabun higienis harus ditempatkan di Pos Sanitasi agar air dan makanan tetap bersih!');
      } else {
        this.returnItemToOrigin(item, 'Makanan dan beras ditempatkan di Dapur Umum ya!');
      }
      return;
    }

    // Hitung penambahan alokasi
    const targetKey = zone.aidOptionId;
    this.allocations[targetKey] = (this.allocations[targetKey] || 0) + item.cost;
    this.totalSpent = Object.values(this.allocations).reduce((a, b) => a + b, 0);

    this.playSound('stamp');
    this.spawnSparkleBurst(zone.x, zone.y, 8);

    // Kunci posisi di dalam area drop zone
    const targetX = zone.x + (item.category === 'pangan' ? (item.itemId === 'item_beras' ? -60 : 60) : (item.itemId === 'item_sabun' ? -60 : 60));
    const targetY = zone.y;

    this.tweens.add({
      targets: item,
      x: targetX,
      y: targetY,
      scale: 0.95,
      duration: this.isReducedMotion ? 50 : 250,
      ease: 'Back.easeOut',
    });

    // Buat tombol undo kecil
    this.createReturnButton(item, zone);

    this.updateWorldFeedback();
  }

  createReturnButton(item, zone) {
    const returnBtn = this.add.container(item.x + 30, item.y - 25);
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

      this.allocations[zone.aidOptionId] = Math.max(0, this.allocations[zone.aidOptionId] - item.cost);
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
    const pangan = this.allocations['opt_pangan'] || 0;
    const sanitasi = this.allocations['opt_sanitasi'] || 0;

    if (pangan >= 50) {
      this.kitchenSubtext.setText('✅ Stok Dapur Aman & Berlimpah!');
      this.kitchenSubtext.setColor('#047857');
    }
    if (sanitasi >= 40) {
      this.sanitasiSubtext.setText('✅ Pos Sanitasi Air Bersih Lengkap!');
      this.sanitasiSubtext.setColor('#047857');
    }

    const canComplete = pangan >= 50 && sanitasi >= 40;
    const remaining = this.initialCoins - this.totalSpent;

    this.emitStateUpdate({
      allocations: { ...this.allocations },
      coinsSpent: this.totalSpent,
      remainingCoins: remaining,
      canComplete,
      activeTip: canComplete
        ? 'Luar biasa! Dapur umum dan pos sanitasi telah terdistribusi dengan tepat sasaran!'
        : `Infak teralokasikan: Dapur ${pangan}/50, Sanitasi ${sanitasi}/40.`,
      placedCount: Object.values(this.allocations).filter((v) => v > 0).length,
    });
  }

  broadcastGameState(tip) {
    this.updateWorldFeedback();
  }
}
