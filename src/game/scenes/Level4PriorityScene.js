import Phaser from 'phaser';
import { BaseMinigameScene } from './BaseMinigameScene';
import { SVG_ASSETS, preloadSvgTexture } from '../assets/svgAssets';

/**
 * LEVEL 4 — DESA BANGKIT: Tantangan Prioritas
 * Mekanik: Menyusun urutan slot prioritas kebutuhan dengan anggaran koin terbatas
 * Nilai Edukasi: Mendahulukan kebutuhan vital (dharuriyyat) sebelum pelengkap saat sumber daya terbatas
 */
export class Level4PriorityScene extends BaseMinigameScene {
  constructor() {
    super('Level4PriorityScene');
  }

  create() {
    super.create();

    this.allocations = {
      opt_sumur: 0,
      opt_obat: 0,
      opt_tani: 0,
      opt_balai: 0,
    };
    this.totalSpent = 0;
    this.priorityOrder = [];

    // 1. Lingkungan Desa Bangkit & Sumur Air
    this.createVillageEnvironment();

    // 2. Empat Slot Tingkat Prioritas
    this.createPrioritySlots();

    // 3. Baki Opsi Kebutuhan Warga di Bawah
    this.createInventoryTray();

    this.broadcastGameState('Urutkan kebutuhan warga: Dahulukan yang paling mendesak untuk keselamatan hidup!');
  }

  createVillageEnvironment() {
    const { width, height } = this.scale;

    // Langit Desa
    const sky = this.add.graphics();
    sky.fillStyle(0xFEF3C7, 1);
    sky.fillRect(0, 0, width, 130);

    // Bukit & Tanah Desa
    sky.fillStyle(0xD97706, 0.4);
    sky.fillCircle(150, 140, 160);
    sky.fillCircle(450, 140, 200);

    // Tanah Kering Musim Kemarau
    this.groundGfx = this.add.graphics();
    this.groundGfx.fillStyle(0xD97706, 1);
    this.groundGfx.fillRect(0, 130, width, height - 250);

    // Ilustrasi Sumur Desa di Sisi Kanan Atas
    this.wellGfx = this.add.graphics();
    this.wellGfx.fillStyle(0x475569, 1);
    this.wellGfx.fillRoundedRect(560, 50, 80, 70, 8);
    this.wellGfx.fillStyle(0x0F172A, 1);
    this.wellGfx.fillEllipse(600, 60, 35, 12);

    this.waterSpray = this.add.graphics();

    // Spanduk Judul Tantangan Prioritas
    const banner = this.add.graphics();
    banner.fillStyle(0x9A3412, 1);
    banner.fillRoundedRect(160, 12, 480, 36, 8);
    banner.lineStyle(2, 0x7C2D12, 1);
    banner.strokeRoundedRect(160, 12, 480, 36, 8);

    this.add.text(400, 30, 'TANTANGAN PRIORITAS ANGGARAN (100 KOIN)', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#FEF3C7',
    }).setOrigin(0.5);
  }

  createPrioritySlots() {
    const slots = [
      { id: 'slot_1', rank: 1, title: 'URGENT #1 (Vital)', note: 'Kebutuhan Pokok Hidup', x: 110, y: 195, color: 0xDC2626 },
      { id: 'slot_2', rank: 2, title: 'URGENT #2 (Penting)', note: 'Kesehatan Warga', x: 270, y: 195, color: 0xEA580C },
      { id: 'slot_3', rank: 3, title: 'URGENT #3 (Produktif)', note: 'Alat Masa Depan', x: 430, y: 195, color: 0x2563EB },
      { id: 'slot_4', rank: 4, title: 'URGENT #4 (Bisa Nanti)', note: 'Pelengkap Desa', x: 590, y: 195, color: 0x64748B },
    ];

    this.prioritySlots = [];

    slots.forEach((s) => {
      const zone = this.add.zone(s.x, s.y, 140, 110).setRectangleDropZone(140, 110);
      zone.zoneId = s.id;
      zone.rank = s.rank;
      zone.isOccupied = false;

      const box = this.add.graphics();
      box.fillStyle(0xFFFFFF, 0.9);
      box.fillRoundedRect(s.x - 70, s.y - 55, 140, 110, 8);
      box.lineStyle(2.5, s.color, 0.8);
      box.strokeRoundedRect(s.x - 70, s.y - 55, 140, 110, 8);
      zone.visualBox = box;
      zone.defaultColor = s.color;

      const titleTxt = this.add.text(s.x, s.y - 40, s.title, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: `#${s.color.toString(16).padStart(6, '0')}`,
      }).setOrigin(0.5);
      zone.titleTxt = titleTxt;

      const noteTxt = this.add.text(s.x, s.y + 38, s.note, {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '9px',
        color: '#64748B',
      }).setOrigin(0.5);
      zone.noteTxt = noteTxt;

      zone.acceptsItem = () => true;
      zone.setHoverState = (state) => {
        box.clear();
        box.fillStyle(0xFFFFFF, 0.9);
        box.fillRoundedRect(s.x - 70, s.y - 55, 140, 110, 8);
        box.lineStyle(state === 'valid' ? 4 : 2.5, state === 'valid' ? 0x10B981 : s.color, 0.8);
        box.strokeRoundedRect(s.x - 70, s.y - 55, 140, 110, 8);
      };

      zone.setInteractive();
      zone.on('pointerdown', () => {
        if (this.selectedItem) {
          this.handleItemDrop(this.selectedItem, zone);
          this.deselectCurrentItem();
        }
      });

      this.dropZones.push(zone);
      this.prioritySlots.push(zone);
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

    this.add.text(45, trayY - 45, '💎 PILIH & SERET KEBUTUHAN KE TINGKAT PRIORITAS YANG TEPAT:', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#FDE68A',
    });

    const items = [
      { id: 'item_sumur', aidKey: 'opt_sumur', title: 'Perbaikan Sumur', cost: 50, x: 120, y: trayY + 5 },
      { id: 'item_obat', aidKey: 'opt_obat', title: 'Paket Obat Sakit', cost: 30, x: 290, y: trayY + 5 },
      { id: 'item_tani', aidKey: 'opt_tani', title: 'Alat Tani Baru', cost: 30, x: 460, y: trayY + 5 },
      { id: 'item_balai', aidKey: 'opt_balai', title: 'Atap Balai Desa', cost: 20, x: 630, y: trayY + 5 },
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
      tag.lineStyle(1.5, 0xF59E0B, 1);
      tag.strokeRoundedRect(-44, 22, 88, 18, 5);
      container.add(tag);

      const label = this.add.text(0, 31, `${d.cost} Koin`, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '10px',
        fontStyle: 'bold',
        color: '#FDE68A',
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
    if (zone.isOccupied) {
      this.returnItemToOrigin(item, 'Slot prioritas ini sudah terisi.');
      return;
    }

    // Periksa batas sisa koin
    const remaining = this.initialCoins - this.totalSpent;
    if (remaining < item.cost) {
      this.returnItemToOrigin(item, `Anggaran tidak cukup! Sisa koinmu: ${remaining}. Prioritaskan yang paling vital dulu.`);
      return;
    }

    this.playSound('stamp');
    this.spawnSparkleBurst(zone.x, zone.y, 8);

    zone.isOccupied = true;
    zone.placedItem = item;
    item.currentZone = zone;

    this.allocations[item.aidKey] = item.cost;
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
    const returnBtn = this.add.container(zone.x + 45, zone.y - 40);
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

      this.allocations[item.aidKey] = 0;
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
    const hasSumur = this.allocations['opt_sumur'] >= 50;
    const hasObat = this.allocations['opt_obat'] >= 30;

    // Animasi semburan air sumur desa
    this.waterSpray.clear();
    if (hasSumur) {
      this.waterSpray.fillStyle(0x38BDF8, 0.8);
      this.waterSpray.fillCircle(600, 45, 12);
      this.waterSpray.fillCircle(585, 35, 8);
      this.waterSpray.fillCircle(615, 35, 8);
    }

    const canComplete = hasSumur && (hasObat || this.allocations['opt_tani'] >= 30);
    const remaining = this.initialCoins - this.totalSpent;

    let tip = 'Aturlah kebutuhan air dan kesehatan di prioritas utama.';
    if (hasSumur && hasObat) {
      tip = 'Keputusan luar biasa! Air bersih dan obat-obatan warga sakit terselamatkan dengan anggaran 80 koin!';
    } else if (hasSumur) {
      tip = 'Alhamdulillah! Air bersih memancar kembali. Warga sangat berterima kasih!';
    }

    this.emitStateUpdate({
      allocations: { ...this.allocations },
      coinsSpent: this.totalSpent,
      remainingCoins: remaining,
      canComplete,
      activeTip: tip,
      placedCount: Object.values(this.allocations).filter((v) => v > 0).length,
    });
  }

  broadcastGameState(tip) {
    this.updateWorldFeedback();
  }
}
