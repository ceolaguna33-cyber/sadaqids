import Phaser from 'phaser';
import { BaseMinigameScene } from './BaseMinigameScene';
import { SVG_ASSETS, preloadSvgTexture } from '../assets/svgAssets';

/**
 * LEVEL 3 — PESISIR HARAPAN: Bangun Manfaat Berkelanjutan
 * Mekanik: Merangkai 3 Pilar Rencana Aset Wakaf & Simulasi Garis Waktu Jangka Panjang
 * Nilai Edukasi: Wakaf menjaga aset pokok abadi agar manfaatnya terus mengalir
 */
export class Level3MangroveScene extends BaseMinigameScene {
  constructor() {
    super('Level3MangroveScene');
  }

  create() {
    super.create();

    this.allocations = {
      opt_bakau: 0,
      opt_pagar: 0,
      opt_lampu: 0,
    };
    this.totalSpent = 0;
    this.currentYear = 1;

    // 1. Lingkungan Pesisir Pantai & Garis Abrasi
    this.createCoastlineEnvironment();

    // 2. Tiga Zona Pilar Rencana Wakaf
    this.createWakafPillarZones();

    // 3. Tombol Garis Waktu Simulasi Jangka Panjang (Tahun 1, 3, 5)
    this.createTimelineControls();

    // 4. Baki Persediaan Rencana Wakaf di Bawah
    this.createInventoryTray();

    this.broadcastGameState('Letakkan 3 komponen wakaf: Tanah Abadi, Konservasi Bakau, dan Dermaga Edukasi.');
  }

  createCoastlineEnvironment() {
    const { width, height } = this.scale;

    // Langit Pesisir Cerah
    const sky = this.add.graphics();
    sky.fillStyle(0xBAE6FD, 1);
    sky.fillRect(0, 0, width, 140);

    // Laut Biru Berombak
    this.seaGfx = this.add.graphics();
    this.seaGfx.fillStyle(0x0284C7, 1);
    this.seaGfx.fillRect(0, 140, 240, height - 260);

    // Daratan Pesisir / Pasir Pantai
    this.shoreGfx = this.add.graphics();
    this.shoreGfx.fillStyle(0xFDE68A, 1);
    this.shoreGfx.fillRect(240, 140, width - 240, height - 260);
    this.shoreGfx.fillStyle(0x86EFAC, 1);
    this.shoreGfx.fillRect(480, 140, width - 480, height - 260);

    // Ombak Bergerak
    this.waves = this.add.graphics();
    this.drawWaves(false);

    // Papan Judul Kawasan Wakaf Pesisir
    const banner = this.add.graphics();
    banner.fillStyle(0x065F46, 1);
    banner.fillRoundedRect(220, 15, 360, 42, 8);
    banner.lineStyle(3, 0x047857, 1);
    banner.strokeRoundedRect(220, 15, 360, 42, 8);

    this.add.text(400, 36, 'KAWASAN WAKAF EDUKASI PESISIR', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#FEF3C7',
    }).setOrigin(0.5);
  }

  drawWaves(isProtected) {
    this.waves.clear();
    if (isProtected) {
      // Ombak tenang teredam bakau
      this.waves.lineStyle(3, 0xE0F2FE, 0.7);
      this.waves.strokeCircle(120, 200, 40);
      this.waves.strokeCircle(160, 240, 30);
    } else {
      // Ombak keras mengancam pantai
      this.waves.lineStyle(4, 0xEF4444, 0.8);
      this.waves.lineBetween(180, 160, 240, 180);
      this.waves.lineBetween(170, 210, 240, 230);
      this.waves.lineBetween(180, 260, 240, 280);
    }
  }

  createWakafPillarZones() {
    // -----------------------------------------------------------------------
    // ZONA 1: BATAS TANAH WAKAF (Pokok Aset Dijaga Abadi)
    // -----------------------------------------------------------------------
    const zone1 = this.add.zone(310, 215, 120, 130).setRectangleDropZone(120, 130);
    zone1.zoneId = 'zone_tanah';
    zone1.aidOptionId = 'opt_bakau';
    zone1.cost = 50;
    zone1.acceptedItemId = 'item_prasasti_tanah';
    zone1.acceptsItem = (item) => item.itemId === 'item_prasasti_tanah';

    const box1 = this.add.graphics();
    box1.lineStyle(2, 0x047857, 0.7);
    box1.strokeRoundedRect(250, 150, 120, 130, 8);
    zone1.visualBox = box1;

    const label1 = this.add.text(310, 165, '1. Tanah Wakaf', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      color: '#064E3B',
      backgroundColor: '#D1FAE5',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);
    zone1.label = label1;

    zone1.setHoverState = (s) => {
      box1.clear();
      box1.lineStyle(s === 'valid' ? 4 : 2, s === 'valid' ? 0x10B981 : 0x047857, 0.8);
      box1.strokeRoundedRect(250, 150, 120, 130, 8);
    };

    zone1.setInteractive();
    zone1.on('pointerdown', () => {
      if (this.selectedItem) {
        if (zone1.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, zone1);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Letakkan Prasasti Ikrar Tanah di batas kawasan wakaf ini!');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(zone1);
    this.zoneTanah = zone1;

    // -----------------------------------------------------------------------
    // ZONA 2: ZONA KONSERVASI BAKAU (Pemanfaatan Ekologis & Benteng Abrasi)
    // -----------------------------------------------------------------------
    const zone2 = this.add.zone(450, 215, 120, 130).setRectangleDropZone(120, 130);
    zone2.zoneId = 'zone_bakau';
    zone2.aidOptionId = 'opt_pagar';
    zone2.cost = 30;
    zone2.acceptedItemId = 'item_bakau_rimbun';
    zone2.acceptsItem = (item) => item.itemId === 'item_bakau_rimbun';

    const box2 = this.add.graphics();
    box2.lineStyle(2, 0x15803D, 0.7);
    box2.strokeRoundedRect(390, 150, 120, 130, 8);
    zone2.visualBox = box2;

    const label2 = this.add.text(450, 165, '2. Hutan Bakau', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      color: '#14532D',
      backgroundColor: '#DCFCE7',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);
    zone2.label = label2;

    zone2.setHoverState = (s) => {
      box2.clear();
      box2.lineStyle(s === 'valid' ? 4 : 2, s === 'valid' ? 0x10B981 : 0x15803D, 0.8);
      box2.strokeRoundedRect(390, 150, 120, 130, 8);
    };

    zone2.setInteractive();
    zone2.on('pointerdown', () => {
      if (this.selectedItem) {
        if (zone2.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, zone2);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Tanam bibit bakau di zona peredam ombak ini!');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(zone2);
    this.zoneBakau = zone2;

    // -----------------------------------------------------------------------
    // ZONA 3: DERMAGA EDUKASI & PENGAWASAN (Manfaat Berkelanjutan untuk Warga)
    // -----------------------------------------------------------------------
    const zone3 = this.add.zone(600, 215, 130, 130).setRectangleDropZone(130, 130);
    zone3.zoneId = 'zone_menara';
    zone3.aidOptionId = 'opt_lampu';
    zone3.cost = 20;
    zone3.acceptedItemId = 'item_menara_pantau';
    zone3.acceptsItem = (item) => item.itemId === 'item_menara_pantau';

    const box3 = this.add.graphics();
    box3.lineStyle(2, 0xB45309, 0.7);
    box3.strokeRoundedRect(535, 150, 130, 130, 8);
    zone3.visualBox = box3;

    const label3 = this.add.text(600, 165, '3. Menara Edukasi', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      color: '#78350F',
      backgroundColor: '#FEF3C7',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);
    zone3.label = label3;

    zone3.setHoverState = (s) => {
      box3.clear();
      box3.lineStyle(s === 'valid' ? 4 : 2, s === 'valid' ? 0x10B981 : 0xB45309, 0.8);
      box3.strokeRoundedRect(535, 150, 130, 130, 8);
    };

    zone3.setInteractive();
    zone3.on('pointerdown', () => {
      if (this.selectedItem) {
        if (zone3.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, zone3);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Bangun menara pantau & dermaga edukasi di zona ini!');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(zone3);
    this.zoneMenara = zone3;
  }

  createTimelineControls() {
    // Tombol Garis Waktu Interaktif
    this.timelineContainer = this.add.container(400, 80);

    const years = [
      { year: 1, label: 'Tahun 1: Awal Wakaf' },
      { year: 3, label: 'Tahun 3: Bakau Lebat' },
      { year: 5, label: 'Tahun 5: Manfaat Abadi' },
    ];

    this.yearButtons = [];

    years.forEach((y, idx) => {
      const btnX = (idx - 1) * 160;
      const btn = this.add.container(btnX, 0);
      btn.setSize(140, 28);
      btn.setInteractive({ useHandCursor: true });

      const bg = this.add.graphics();
      bg.fillStyle(idx === 0 ? 0x047857 : 0x334155, 0.9);
      bg.fillRoundedRect(-70, -14, 140, 28, 6);
      btn.add(bg);
      btn.bg = bg;

      const txt = this.add.text(0, 0, y.label, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '10px',
        fontStyle: 'bold',
        color: '#FFFFFF',
      }).setOrigin(0.5);
      btn.add(txt);
      btn.txt = txt;

      btn.on('pointerdown', () => {
        this.setTimelineYear(y.year);
      });

      this.yearButtons.push(btn);
      this.timelineContainer.add(btn);
    });
  }

  setTimelineYear(year) {
    this.currentYear = year;
    this.playSound('tap');

    this.yearButtons.forEach((b, idx) => {
      const match = (idx === 0 && year === 1) || (idx === 1 && year === 3) || (idx === 2 && year === 5);
      b.bg.clear();
      b.bg.fillStyle(match ? 0x047857 : 0x334155, 0.9);
      b.bg.fillRoundedRect(-70, -14, 140, 28, 6);
    });

    const isAllPlaced = this.allocations['opt_bakau'] > 0 && this.allocations['opt_pagar'] > 0;
    this.drawWaves(isAllPlaced);

    if (year === 5 && isAllPlaced) {
      this.emitNotification('Tahun ke-5: Lahan wakaf tetap terjaga abadi, dan pusat edukasi pesisir terus memberi manfaat bagi generasi penerus!', 'success');
    }
  }

  createInventoryTray() {
    const { width, height } = this.scale;
    const trayY = height - 60;

    const trayBg = this.add.graphics();
    trayBg.fillStyle(0x0F172A, 0.95);
    trayBg.fillRoundedRect(20, trayY - 55, width - 40, 105, 16);
    trayBg.lineStyle(3, 0x334155, 1);
    trayBg.strokeRoundedRect(20, trayY - 55, width - 40, 105, 16);

    this.add.text(45, trayY - 45, '🌿 TIGA PILAR RENCANA WAKAF PESISIR (Seret ke Lokasi yang Tepat):', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#6EE7B7',
    });

    const items = [
      { id: 'item_prasasti_tanah', title: 'Ikrar Tanah Wakaf', cost: 50, x: 180, y: trayY + 5 },
      { id: 'item_bakau_rimbun', title: 'Hutan Bakau', cost: 30, x: 400, y: trayY + 5 },
      { id: 'item_menara_pantau', title: 'Menara Edukasi', cost: 20, x: 620, y: trayY + 5 },
    ];

    items.forEach((d) => {
      const container = this.add.container(d.x, d.y);
      container.setSize(80, 80);
      container.setInteractive({ draggable: true, useHandCursor: true });

      container.itemId = d.id;
      container.itemTitle = d.title;
      container.cost = d.cost;
      container.originX = d.x;
      container.originY = d.y;
      container.originalScale = 0.95;
      container.setScale(0.95);

      const sprite = this.add.image(0, -6, d.id);
      sprite.setScale(0.8);
      container.add(sprite);

      const tag = this.add.graphics();
      tag.fillStyle(0x1E293B, 0.9);
      tag.fillRoundedRect(-45, 22, 90, 18, 5);
      tag.lineStyle(1.5, 0x10B981, 1);
      tag.strokeRoundedRect(-45, 22, 90, 18, 5);
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
      this.returnItemToOrigin(item, 'Pilar wakaf ini kurang pas di sini. Cocokkan dengan zonanya!');
      return;
    }

    if (zone.isOccupied) {
      this.returnItemToOrigin(item, 'Zona ini sudah terpasang.');
      return;
    }

    this.playSound('stamp');
    this.spawnSparkleBurst(zone.x, zone.y, 10);

    zone.isOccupied = true;
    zone.placedItem = item;
    zone.label.setVisible(false);

    this.allocations[zone.aidOptionId] = item.cost;
    this.totalSpent = Object.values(this.allocations).reduce((a, b) => a + b, 0);

    this.tweens.add({
      targets: item,
      x: zone.x,
      y: zone.y,
      scale: 1,
      duration: this.isReducedMotion ? 50 : 250,
      ease: 'Back.easeOut',
    });

    this.createReturnButton(item, zone);
    this.updateWorldFeedback();
  }

  createReturnButton(item, zone) {
    const returnBtn = this.add.container(zone.x + 40, zone.y - 45);
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
      zone.label.setVisible(true);

      this.allocations[zone.aidOptionId] = 0;
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
    const hasTanah = this.allocations['opt_bakau'] >= 50;
    const hasBakau = this.allocations['opt_pagar'] >= 30;
    const canComplete = hasTanah && hasBakau;

    this.drawWaves(canComplete);

    const remaining = this.initialCoins - this.totalSpent;
    this.emitStateUpdate({
      allocations: { ...this.allocations },
      coinsSpent: this.totalSpent,
      remainingCoins: remaining,
      canComplete,
      activeTip: canComplete
        ? 'Rencana Wakaf Berkelanjutan berhasil dirangkai! Lahan abadi dan hutan bakau melindungi pesisir selamanya.'
        : 'Pastikan Tanah Wakaf dan Konservasi Bakau terpasang untuk melindungi pesisir secara berkelanjutan.',
      placedCount: Object.values(this.allocations).filter((v) => v > 0).length,
    });
  }

  broadcastGameState(tip) {
    this.updateWorldFeedback();
  }
}
