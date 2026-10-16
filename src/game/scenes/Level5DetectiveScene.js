import Phaser from 'phaser';
import { BaseMinigameScene } from './BaseMinigameScene';
import { SVG_ASSETS, preloadSvgTexture } from '../assets/svgAssets';

/**
 * LEVEL 5 — TAMAN AMANAH: Detektif Laporan
 * Mekanik: Audit interaktif memeriksa proposal rencana, nota belanja sah, dan foto bukti fisik
 * Nilai Edukasi: Amanah dan transparansi, membedakan klaim kosong dari bukti nyata yang jujur
 */
export class Level5DetectiveScene extends BaseMinigameScene {
  constructor() {
    super('Level5DetectiveScene');
  }

  create() {
    super.create();

    this.allocations = {
      opt_perpus: 0,
      opt_taman: 0,
      opt_dekorasi: 0,
    };
    this.totalSpent = 0;
    this.rejectedFake = false;

    // 1. Lingkungan Meja Pemeriksaan Detektif Amanah
    this.createAuditDeskEnvironment();

    // 2. Tiga Slot Papan Verifikasi + 1 Kotak Penolakan Dokumen Fiktif
    this.createVerificationSlots();

    // 3. Baki Dokumen & Bukti di Bagian Bawah
    this.createInventoryTray();

    this.broadcastGameState('Sebagai Detektif Amanah, cocokkan dokumen sah ke papan verifikasi dan tolak klaim tanpa bukti!');
  }

  createAuditDeskEnvironment() {
    const { width, height } = this.scale;

    // Meja Kayu Pemeriksaan Laporan
    const desk = this.add.graphics();
    desk.fillStyle(0xFFF1F2, 1);
    desk.fillRect(0, 0, width, height - 130);

    // Papan Verifikasi Transparansi di Tengah
    const board = this.add.graphics();
    board.fillStyle(0xFFFFFF, 1);
    board.fillRoundedRect(30, 45, 540, 245, 12);
    board.lineStyle(3, 0xBE185D, 1);
    board.strokeRoundedRect(30, 45, 540, 245, 12);

    // Header Spanduk Detektif
    const banner = this.add.graphics();
    banner.fillStyle(0x9D174D, 1);
    banner.fillRoundedRect(160, 10, 480, 32, 6);
    this.add.text(400, 26, 'MEJA DETEKTIF: AUDIT & VERIFIKASI LAPORAN AMANAH', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FDE68A',
    }).setOrigin(0.5);

    // Kaca Pembesar Dekoratif
    const mag = this.add.graphics();
    mag.lineStyle(4, 0x94A3B8, 1);
    mag.strokeCircle(65, 30, 14);
    mag.lineStyle(4, 0x78350F, 1);
    mag.lineBetween(75, 40, 88, 53);

    // Kotak Penolakan Dokumen Gelap di Sisi Kanan
    const rejectBin = this.add.graphics();
    rejectBin.fillStyle(0xFEF2F2, 1);
    rejectBin.fillRoundedRect(590, 50, 180, 240, 12);
    rejectBin.lineStyle(3, 0xDC2626, 1);
    rejectBin.strokeRoundedRect(590, 50, 180, 240, 12);

    this.add.text(680, 75, '🗑️ PENOLAKAN KLAIM', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#991B1B',
    }).setOrigin(0.5);

    this.add.text(680, 100, 'Tolak dokumen mencurigakan\nyang tidak ada bukti fisiknya!', {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: '9px',
      color: '#B91C1C',
      align: 'center',
    }).setOrigin(0.5);

    // Stempel Transparansi (Tersembunyi sampai diverifikasi)
    this.stampContainer = this.add.container(300, 160);
    this.stampContainer.setVisible(false);

    const stampGfx = this.add.graphics();
    stampGfx.lineStyle(4, 0x059669, 0.9);
    stampGfx.strokeRoundedRect(-140, -35, 280, 70, 10);
    this.stampContainer.add(stampGfx);

    const stampText = this.add.text(0, -6, 'LAPORAN AMANAH TERVERIFIKASI', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#047857',
    }).setOrigin(0.5);
    this.stampContainer.add(stampText);

    const stampSub = this.add.text(0, 14, 'Semua Pengeluaran Sesuai Bukti Nyata', {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: '10px',
      color: '#065F46',
    }).setOrigin(0.5);
    this.stampContainer.add(stampSub);
  }

  createVerificationSlots() {
    // -----------------------------------------------------------------------
    // SLOT 1: RENCANA ANGGARAN (80 Koin)
    // -----------------------------------------------------------------------
    const slot1 = this.add.zone(120, 175, 140, 170).setRectangleDropZone(140, 170);
    slot1.zoneId = 'slot_anggaran';
    slot1.acceptedItemId = 'doc_anggaran';
    slot1.isOccupied = false;

    const box1 = this.add.graphics();
    box1.lineStyle(2, 0x0284C7, 0.7);
    box1.strokeRoundedRect(50, 90, 140, 170, 8);
    slot1.visualBox = box1;

    const label1 = this.add.text(120, 105, '1. Proposal Rencana', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '10px',
      color: '#0369A1',
      backgroundColor: '#E0F2FE',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);
    slot1.label = label1;

    slot1.acceptsItem = (item) => item.itemId === 'doc_anggaran';
    slot1.setHoverState = (s) => {
      box1.clear();
      box1.lineStyle(s === 'valid' ? 3 : 2, s === 'valid' ? 0x10B981 : 0x0284C7, 0.8);
      box1.strokeRoundedRect(50, 90, 140, 170, 8);
    };

    slot1.setInteractive();
    slot1.on('pointerdown', () => {
      if (this.selectedItem) {
        if (slot1.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, slot1);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Tempatkan Dokumen Rencana Anggaran di sini!');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(slot1);
    this.slot1 = slot1;

    // -----------------------------------------------------------------------
    // SLOT 2: NOTA KWITANSI RESMI (Total 80 Koin)
    // -----------------------------------------------------------------------
    const slot2 = this.add.zone(300, 175, 140, 170).setRectangleDropZone(140, 170);
    slot2.zoneId = 'slot_kwitansi';
    slot2.acceptedItemId = 'doc_kwitansi_sah';
    slot2.isOccupied = false;

    const box2 = this.add.graphics();
    box2.lineStyle(2, 0x059669, 0.7);
    box2.strokeRoundedRect(230, 90, 140, 170, 8);
    slot2.visualBox = box2;

    const label2 = this.add.text(300, 105, '2. Nota Kwitansi Sah', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '10px',
      color: '#064E3B',
      backgroundColor: '#D1FAE5',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);
    slot2.label = label2;

    slot2.acceptsItem = (item) => item.itemId === 'doc_kwitansi_sah';
    slot2.setHoverState = (s) => {
      box2.clear();
      box2.lineStyle(s === 'valid' ? 3 : 2, s === 'valid' ? 0x10B981 : 0x059669, 0.8);
      box2.strokeRoundedRect(230, 90, 140, 170, 8);
    };

    slot2.setInteractive();
    slot2.on('pointerdown', () => {
      if (this.selectedItem) {
        if (slot2.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, slot2);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Gunakan Nota Toko Resmi yang sah untuk diverifikasi.');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(slot2);
    this.slot2 = slot2;

    // -----------------------------------------------------------------------
    // SLOT 3: FOTO BUKTI FISIK LAPANGAN
    // -----------------------------------------------------------------------
    const slot3 = this.add.zone(480, 175, 140, 170).setRectangleDropZone(140, 170);
    slot3.zoneId = 'slot_foto';
    slot3.acceptedItemId = 'doc_foto_lapangan';
    slot3.isOccupied = false;

    const box3 = this.add.graphics();
    box3.lineStyle(2, 0x475569, 0.7);
    box3.strokeRoundedRect(410, 90, 140, 170, 8);
    slot3.visualBox = box3;

    const label3 = this.add.text(480, 105, '3. Bukti Fisik Lapangan', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '10px',
      color: '#1E293B',
      backgroundColor: '#E2E8F0',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);
    slot3.label = label3;

    slot3.acceptsItem = (item) => item.itemId === 'doc_foto_lapangan';
    slot3.setHoverState = (s) => {
      box3.clear();
      box3.lineStyle(s === 'valid' ? 3 : 2, s === 'valid' ? 0x10B981 : 0x475569, 0.8);
      box3.strokeRoundedRect(410, 90, 140, 170, 8);
    };

    slot3.setInteractive();
    slot3.on('pointerdown', () => {
      if (this.selectedItem) {
        if (slot3.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, slot3);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Tempatkan foto bukti fisik lapangan di slot ke-3 ini!');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(slot3);
    this.slot3 = slot3;

    // -----------------------------------------------------------------------
    // KOTAK PENOLAKAN DOKUMEN FIKTIF (Trash/Reject Zone)
    // -----------------------------------------------------------------------
    const zoneReject = this.add.zone(680, 190, 150, 130).setRectangleDropZone(150, 130);
    zoneReject.zoneId = 'zone_reject';
    zoneReject.acceptedItemId = 'doc_kwitansi_palsu';
    zoneReject.acceptsItem = (item) => item.itemId === 'doc_kwitansi_palsu';

    zoneReject.setHoverState = (s) => {};
    zoneReject.setInteractive();
    zoneReject.on('pointerdown', () => {
      if (this.selectedItem) {
        if (zoneReject.acceptsItem(this.selectedItem)) {
          this.handleRejectDrop(this.selectedItem, zoneReject);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Dokumen ini sah, jangan dibuang ke kotak penolakan!');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(zoneReject);
    this.zoneReject = zoneReject;
  }

  createInventoryTray() {
    const { width, height } = this.scale;
    const trayY = height - 60;

    const trayBg = this.add.graphics();
    trayBg.fillStyle(0x0F172A, 0.95);
    trayBg.fillRoundedRect(20, trayY - 55, width - 40, 105, 16);
    trayBg.lineStyle(3, 0x334155, 1);
    trayBg.strokeRoundedRect(20, trayY - 55, width - 40, 105, 16);

    this.add.text(45, trayY - 45, '🔍 DOKUMEN & BUKTI AUDIT (Periksa dengan Teliti & Cocokkan):', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#FB7185',
    });

    const items = [
      { id: 'doc_anggaran', title: 'Proposal Anggaran (80K)', x: 130, y: trayY + 5 },
      { id: 'doc_kwitansi_sah', title: 'Kwitansi Toko Sah (80K)', x: 310, y: trayY + 5 },
      { id: 'doc_kwitansi_palsu', title: 'Nota Gelap Fiktif (40K)', x: 490, y: trayY + 5 },
      { id: 'doc_foto_lapangan', title: 'Foto Bukti Fisik', x: 670, y: trayY + 5 },
    ];

    items.forEach((d) => {
      const container = this.add.container(d.x, d.y);
      container.setSize(80, 80);
      container.setInteractive({ draggable: true, useHandCursor: true });

      container.itemId = d.id;
      container.itemTitle = d.title;
      container.originX = d.x;
      container.originY = d.y;
      container.originalScale = 0.9;
      container.setScale(0.9);

      const sprite = this.add.image(0, -6, d.id);
      sprite.setScale(0.8);
      container.add(sprite);

      const tag = this.add.graphics();
      tag.fillStyle(0x1E293B, 0.9);
      tag.fillRoundedRect(-48, 22, 96, 18, 5);
      tag.lineStyle(1.5, 0xFB7185, 1);
      tag.strokeRoundedRect(-48, 22, 96, 18, 5);
      container.add(tag);

      const label = this.add.text(0, 31, d.title.split(' ')[0], {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '10px',
        fontStyle: 'bold',
        color: '#FECDD3',
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
    if (item.itemId === 'doc_kwitansi_palsu') {
      this.returnItemToOrigin(item, 'Peringatan! Nota gelap ini tidak ada bukti fisiknya! Seret ke Kotak Penolakan.');
      return;
    }

    if (!zone.acceptsItem(item)) {
      this.returnItemToOrigin(item, 'Dokumen ini bukan untuk slot tersebut.');
      return;
    }

    if (zone.isOccupied) {
      this.returnItemToOrigin(item, 'Slot verifikasi ini sudah terisi.');
      return;
    }

    this.playSound('stamp');
    this.spawnSparkleBurst(zone.x, zone.y, 8);

    zone.isOccupied = true;
    zone.placedItem = item;
    zone.label.setVisible(false);

    this.tweens.add({
      targets: item,
      x: zone.x,
      y: zone.y,
      scale: 1,
      duration: this.isReducedMotion ? 50 : 250,
      ease: 'Back.easeOut',
    });

    this.createReturnButton(item, zone);
    this.checkAuditCompletion();
  }

  handleRejectDrop(item, zone) {
    this.playSound('success');
    this.spawnSparkleBurst(zone.x, zone.y, 10);
    this.rejectedFake = true;

    this.tweens.add({
      targets: item,
      x: zone.x,
      y: zone.y,
      scale: 0.6,
      alpha: 0.5,
      duration: this.isReducedMotion ? 50 : 250,
      ease: 'Back.easeOut',
    });

    this.emitNotification('Hebat! Kamu berhasil menolak klaim fiktif tanpa bukti. Amanah terjaga!', 'success');
    this.checkAuditCompletion();
  }

  createReturnButton(item, zone) {
    const returnBtn = this.add.container(zone.x + 40, zone.y - 50);
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

      this.tweens.add({
        targets: item,
        x: item.originX,
        y: item.originY,
        scale: item.originalScale,
        duration: this.isReducedMotion ? 50 : 250,
        ease: 'Back.easeOut',
      });

      this.checkAuditCompletion();
    });

    item.returnBtn = returnBtn;
  }

  checkAuditCompletion() {
    const doc1 = this.slot1.isOccupied;
    const doc2 = this.slot2.isOccupied;
    const doc3 = this.slot3.isOccupied;

    if (doc1 && doc2 && doc3 && this.rejectedFake) {
      // Alokasi resmi Taman Amanah: Perpustakaan 50 Koin + Taman 30 Koin = 80 Koin
      this.allocations['opt_perpus'] = 50;
      this.allocations['opt_taman'] = 30;
      this.allocations['opt_dekorasi'] = 0;
      this.totalSpent = 80;

      this.stampContainer.setVisible(true);
      this.playSound('stamp');
      this.spawnSparkleBurst(300, 160, 15);

      this.emitStateUpdate({
        allocations: { ...this.allocations },
        coinsSpent: 80,
        remainingCoins: 20,
        canComplete: true,
        activeTip: 'Audit Sempurna! Semua laporan terverifikasi jujur, transparan, dan sesuai bukti nyata.',
        placedCount: 4,
      });
    } else {
      const verifiedCount = (doc1 ? 1 : 0) + (doc2 ? 1 : 0) + (doc3 ? 1 : 0);
      this.emitStateUpdate({
        allocations: { ...this.allocations },
        coinsSpent: this.totalSpent,
        remainingCoins: this.initialCoins - this.totalSpent,
        canComplete: false,
        activeTip: `Verifikasi berjalan: ${verifiedCount}/3 dokumen sah tercocokkan. Tolak klaim mencurigakan!`,
        placedCount: verifiedCount,
      });
    }
  }

  broadcastGameState(tip) {
    this.checkAuditCompletion();
  }
}
