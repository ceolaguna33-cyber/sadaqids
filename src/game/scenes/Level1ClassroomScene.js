import Phaser from 'phaser';
import { BaseMinigameScene } from './BaseMinigameScene';

/**
 * LEVEL 1 — DUSUN PELANGI: Rangkai Kembali Kelas
 * Mekanik: Drag-and-drop objek bantuan ke zona target di kelas
 * Nilai Edukasi: Sedekah mendahulukan kebutuhan belajar yang mendesak
 */
export class Level1ClassroomScene extends BaseMinigameScene {
  constructor() {
    super('Level1ClassroomScene');
  }

  create() {
    super.create();

    // Data alokasi koin awal
    this.allocations = {
      opt_buku: 0,
      opt_seragam: 0,
      opt_hiasan: 0,
    };
    this.totalSpent = 0;

    // 1. Gambar Lingkungan Ruang Kelas Cerita
    this.createClassroomEnvironment();

    // 2. Karakter Murid Dusun Pelangi
    this.createCharacters();

    // 3. Drop Zones (Meja Belajar, Lemari Seragam, Dinding Hiasan)
    this.createDropZones();

    // 4. Baki Persediaan Bantuan Virtual di bagian bawah
    this.createInventoryTray();

    // 5. Update state awal ke React HUD
    this.broadcastGameState('Air hujan merembes ke kelas! Seret buku dan perlengkapan ke meja untuk membantu sahabat kelas.');
  }

  createClassroomEnvironment() {
    const { width, height } = this.scale;

    // Dinding Kelas Hangat
    const wall = this.add.graphics();
    wall.fillStyle(0xFFFBEB, 1);
    wall.fillRect(0, 0, width, height - 130);

    // Garis Lis Dinding
    wall.fillStyle(0xFDE68A, 1);
    wall.fillRect(0, height - 145, width, 15);

    // Lantai Kayu Hangat Kelas
    const floor = this.add.graphics();
    floor.fillStyle(0xB45309, 1);
    floor.fillRect(0, height - 130, width, 130);

    // Garis-garis Ubin Kayu
    floor.lineStyle(1.5, 0x92400E, 0.4);
    for (let x = 0; x < width; x += 60) {
      floor.lineBetween(x, height - 130, x - 30, height);
    }
    floor.lineBetween(0, height - 80, width, height - 80);

    // Jendela Besar Lengkung Menampilkan Pelangi
    const windowGfx = this.add.graphics();
    windowGfx.fillStyle(0xBAE6FD, 1);
    windowGfx.fillRoundedRect(30, 20, 160, 120, 16);
    windowGfx.lineStyle(4, 0x0284C7, 1);
    windowGfx.strokeRoundedRect(30, 20, 160, 120, 16);

    // Lengkung Pelangi di Luar Jendela
    windowGfx.lineStyle(6, 0xFCA5A5, 0.7);
    windowGfx.strokeCircle(110, 130, 80);
    windowGfx.lineStyle(6, 0xFDE047, 0.7);
    windowGfx.strokeCircle(110, 130, 72);
    windowGfx.lineStyle(6, 0x86EFAC, 0.7);
    windowGfx.strokeCircle(110, 130, 64);

    // Papan Tulis Kelas
    const blackboard = this.add.graphics();
    blackboard.fillStyle(0x064E3B, 1);
    blackboard.fillRoundedRect(230, 20, 320, 110, 8);
    blackboard.lineStyle(5, 0x78350F, 1);
    blackboard.strokeRoundedRect(230, 20, 320, 110, 8);

    this.add.text(390, 42, 'SD DUSUN PELANGI', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#FEF3C7',
    }).setOrigin(0.5);

    this.chalkNote = this.add.text(390, 75, 'Misi: Sedekah Perlengkapan Belajar\nUjian sekolah dimulai minggu depan!', {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: '13px',
      color: '#A7F3D0',
      align: 'center',
      lineSpacing: 4,
    }).setOrigin(0.5);

    // Gantungan & Lemari Seragam di Sisi Kanan
    const cubbyGfx = this.add.graphics();
    cubbyGfx.fillStyle(0xD97706, 1);
    cubbyGfx.fillRoundedRect(590, 25, 175, 125, 8);
    cubbyGfx.lineStyle(3, 0x92400E, 1);
    cubbyGfx.strokeRoundedRect(590, 25, 175, 125, 8);
    cubbyGfx.fillStyle(0x78350F, 1);
    cubbyGfx.fillRect(590, 85, 175, 6);

    this.add.text(677, 40, 'RAK SERAGAM', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#FEF3C7',
    }).setOrigin(0.5);
  }

  createCharacters() {
    // Karakter Murid di Dekat Meja Kiri
    this.studentChar = this.add.image(210, 220, 'char_student_worry');
    this.studentChar.setOrigin(0.5, 0.5);
    this.studentChar.setScale(1);
    this.studentChar.setDepth(20);

    if (!this.isReducedMotion) {
      this.tweens.add({
        targets: this.studentChar,
        y: 215,
        duration: 1800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }

    // Balon Ucapan Murid
    this.speechBubble = this.add.graphics();
    this.speechBubble.fillStyle(0xFFFFFF, 0.95);
    this.speechBubble.fillRoundedRect(120, 125, 180, 45, 10);
    this.speechBubble.lineStyle(2, 0x64748B, 1);
    this.speechBubble.strokeRoundedRect(120, 125, 180, 45, 10);
    this.speechBubble.setDepth(25);

    this.speechText = this.add.text(210, 147, 'Bukuku basah kuyup...', {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#1E293B',
      align: 'center',
    }).setOrigin(0.5).setDepth(26);
  }

  createDropZones() {
    // -----------------------------------------------------------------------
    // DROP ZONE 1: MEJA BELAJAR MURID (Target Paket Buku & Alat Tulis)
    // -----------------------------------------------------------------------
    const deskGfx = this.add.graphics();
    deskGfx.fillStyle(0xD97706, 1);
    deskGfx.fillRoundedRect(280, 200, 210, 85, 10);
    deskGfx.lineStyle(3, 0x92400E, 1);
    deskGfx.strokeRoundedRect(280, 200, 210, 85, 10);

    // Kaki meja
    deskGfx.fillStyle(0x78350F, 1);
    deskGfx.fillRect(300, 285, 12, 45);
    deskGfx.fillRect(458, 285, 12, 45);

    // Genangan air awal di atas meja (indikasi masalah banjir)
    this.deskPuddle = this.add.graphics();
    this.deskPuddle.fillStyle(0x60A5FA, 0.6);
    this.deskPuddle.fillEllipse(385, 235, 60, 20);
    this.deskPuddle.fillStyle(0x93C5FD, 0.8);
    this.deskPuddle.fillEllipse(410, 245, 30, 12);

    const zone1 = this.add.zone(385, 240, 190, 75).setRectangleDropZone(190, 75);
    zone1.zoneId = 'zone_meja_buku';
    zone1.acceptedItemId = 'item_buku';
    zone1.aidOptionId = 'opt_buku';
    zone1.cost = 50;
    zone1.isOccupied = false;

    // Indikator visual zona
    const zone1Box = this.add.graphics();
    zone1Box.lineStyle(2, 0x3B82F6, 0.7);
    zone1Box.strokeRoundedRect(290, 205, 190, 70, 8);
    zone1.visualBox = zone1Box;

    const zone1Label = this.add.text(385, 218, '🎯 Zona Meja Belajar (Buku)', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      color: '#1E3A8A',
      backgroundColor: '#DBEAFE',
      padding: { x: 6, y: 3 },
    }).setOrigin(0.5);
    zone1.label = zone1Label;

    zone1.acceptsItem = (item) => item.itemId === 'item_buku';
    zone1.setHoverState = (state) => {
      zone1Box.clear();
      if (state === 'valid') {
        zone1Box.lineStyle(4, 0x10B981, 1);
        zone1Box.strokeRoundedRect(290, 205, 190, 70, 8);
      } else if (state === 'invalid') {
        zone1Box.lineStyle(3, 0xEF4444, 1);
        zone1Box.strokeRoundedRect(290, 205, 190, 70, 8);
      } else {
        zone1Box.lineStyle(2, 0x3B82F6, 0.7);
        zone1Box.strokeRoundedRect(290, 205, 190, 70, 8);
      }
    };

    // Jadikan drop zone bisa diketuk (tap-to-select support)
    zone1.setInteractive();
    zone1.on('pointerdown', () => {
      if (this.selectedItem) {
        if (zone1.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, zone1);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Benda ini bukan untuk meja belajar. Letakkan buku di sini ya!');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(zone1);
    this.zoneBuku = zone1;

    // -----------------------------------------------------------------------
    // DROP ZONE 2: RAK LEMARI SERAGAM (Target Seragam & Sepatu Kering)
    // -----------------------------------------------------------------------
    const zone2 = this.add.zone(677, 95, 150, 70).setRectangleDropZone(150, 70);
    zone2.zoneId = 'zone_rak_seragam';
    zone2.acceptedItemId = 'item_seragam';
    zone2.aidOptionId = 'opt_seragam';
    zone2.cost = 40;
    zone2.isOccupied = false;

    const zone2Box = this.add.graphics();
    zone2Box.lineStyle(2, 0x059669, 0.7);
    zone2Box.strokeRoundedRect(602, 60, 150, 68, 6);
    zone2.visualBox = zone2Box;

    const zone2Label = this.add.text(677, 72, '🎯 Gantungan Seragam', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '10px',
      color: '#064E3B',
      backgroundColor: '#D1FAE5',
      padding: { x: 5, y: 2 },
    }).setOrigin(0.5);
    zone2.label = zone2Label;

    zone2.acceptsItem = (item) => item.itemId === 'item_seragam';
    zone2.setHoverState = (state) => {
      zone2Box.clear();
      if (state === 'valid') {
        zone2Box.lineStyle(4, 0x10B981, 1);
        zone2Box.strokeRoundedRect(602, 60, 150, 68, 6);
      } else if (state === 'invalid') {
        zone2Box.lineStyle(3, 0xEF4444, 1);
        zone2Box.strokeRoundedRect(602, 60, 150, 68, 6);
      } else {
        zone2Box.lineStyle(2, 0x059669, 0.7);
        zone2Box.strokeRoundedRect(602, 60, 150, 68, 6);
      }
    };

    zone2.setInteractive();
    zone2.on('pointerdown', () => {
      if (this.selectedItem) {
        if (zone2.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, zone2);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Gantungan ini khusus untuk seragam dan sepatu bersih!');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(zone2);
    this.zoneSeragam = zone2;

    // -----------------------------------------------------------------------
    // DROP ZONE 3: DINDING KELAS (Target Pita & Hiasan)
    // -----------------------------------------------------------------------
    const zone3 = this.add.zone(390, 160, 260, 45).setRectangleDropZone(260, 45);
    zone3.zoneId = 'zone_dinding_hiasan';
    zone3.acceptedItemId = 'item_hiasan';
    zone3.aidOptionId = 'opt_hiasan';
    zone3.cost = 10;
    zone3.isOccupied = false;

    const zone3Box = this.add.graphics();
    zone3Box.lineStyle(2, 0xF59E0B, 0.6);
    zone3Box.strokeRoundedRect(260, 138, 260, 42, 6);
    zone3.visualBox = zone3Box;

    const zone3Label = this.add.text(390, 150, '🎯 Dinding Hiasan (Pelengkap)', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '10px',
      color: '#78350F',
      backgroundColor: '#FEF3C7',
      padding: { x: 5, y: 2 },
    }).setOrigin(0.5);
    zone3.label = zone3Label;

    zone3.acceptsItem = (item) => item.itemId === 'item_hiasan';
    zone3.setHoverState = (state) => {
      zone3Box.clear();
      if (state === 'valid') {
        zone3Box.lineStyle(3, 0x10B981, 1);
        zone3Box.strokeRoundedRect(260, 138, 260, 42, 6);
      } else if (state === 'invalid') {
        zone3Box.lineStyle(3, 0xEF4444, 1);
        zone3Box.strokeRoundedRect(260, 138, 260, 42, 6);
      } else {
        zone3Box.lineStyle(2, 0xF59E0B, 0.6);
        zone3Box.strokeRoundedRect(260, 138, 260, 42, 6);
      }
    };

    zone3.setInteractive();
    zone3.on('pointerdown', () => {
      if (this.selectedItem) {
        if (zone3.acceptsItem(this.selectedItem)) {
          this.handleItemDrop(this.selectedItem, zone3);
        } else {
          this.returnItemToOrigin(this.selectedItem, 'Dinding ini untuk hiasan kelas.');
        }
        this.deselectCurrentItem();
      }
    });

    this.dropZones.push(zone3);
    this.zoneHiasan = zone3;
  }

  createInventoryTray() {
    const { width, height } = this.scale;
    const trayY = height - 60;

    // Latar Belakang Kotak Persediaan
    const trayBg = this.add.graphics();
    trayBg.fillStyle(0x1E293B, 0.95);
    trayBg.fillRoundedRect(20, trayY - 55, width - 40, 105, 16);
    trayBg.lineStyle(3, 0x334155, 1);
    trayBg.strokeRoundedRect(20, trayY - 55, width - 40, 105, 16);

    this.add.text(45, trayY - 45, '🎒 PERSEDIAAN BANTUAN (Seret atau Ketuk Objek ke Target):', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#FDE68A',
    });

    // 3 Objek Bantuan yang dapat diseret
    const itemData = [
      {
        id: 'item_buku',
        title: 'Buku & Alat Tulis',
        cost: 50,
        x: 160,
        y: trayY + 5,
        targetZone: this.zoneBuku,
      },
      {
        id: 'item_seragam',
        title: 'Seragam & Sepatu',
        cost: 40,
        x: 400,
        y: trayY + 5,
        targetZone: this.zoneSeragam,
      },
      {
        id: 'item_hiasan',
        title: 'Pita Hiasan',
        cost: 10,
        x: 640,
        y: trayY + 5,
        targetZone: this.zoneHiasan,
      },
    ];

    itemData.forEach((d) => {
      const itemContainer = this.add.container(d.x, d.y);
      itemContainer.setSize(90, 90);
      itemContainer.setInteractive({ draggable: true, useHandCursor: true });

      itemContainer.itemId = d.id;
      itemContainer.itemTitle = d.title;
      itemContainer.cost = d.cost;
      itemContainer.originX = d.x;
      itemContainer.originY = d.y;
      itemContainer.originalScale = 1;
      itemContainer.targetZone = d.targetZone;

      // Gambar sprite objek
      const sprite = this.add.image(0, -8, d.id);
      sprite.setScale(0.85);
      itemContainer.add(sprite);

      // Label Nama & Biaya Koin
      const tagGfx = this.add.graphics();
      tagGfx.fillStyle(0x0F172A, 0.85);
      tagGfx.fillRoundedRect(-50, 22, 100, 20, 6);
      tagGfx.lineStyle(1.5, 0xF59E0B, 1);
      tagGfx.strokeRoundedRect(-50, 22, 100, 20, 6);
      itemContainer.add(tagGfx);

      const coinIcon = this.add.image(-36, 32, 'coin');
      coinIcon.setScale(0.35);
      itemContainer.add(coinIcon);

      const costText = this.add.text(-22, 32, `${d.cost} Koin`, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#FDE68A',
      }).setOrigin(0, 0.5);
      itemContainer.add(costText);

      // Klik untuk alternatif Tap-to-Select
      itemContainer.on('pointerdown', (pointer) => {
        // Cek jika bukan sedang drag
        if (pointer.getDistance() < 5) {
          this.selectItemForTap(itemContainer);
        }
      });

      this.input.setDraggable(itemContainer);
      this.draggableItems.push(itemContainer);
    });
  }

  /**
   * Logika saat item dilepas di drop zone
   */
  handleItemDrop(item, zone) {
    if (!zone.acceptsItem(item)) {
      this.returnItemToOrigin(item, `Wah, ${item.itemTitle} kurang pas diletakkan di sana. Coba cocokkan dengan zonanya ya!`);
      return;
    }

    if (zone.isOccupied) {
      this.returnItemToOrigin(item, 'Zona ini sudah terisi bantuan.');
      return;
    }

    // Periksa sisa koin virtual
    const remaining = this.initialCoins - this.totalSpent;
    if (remaining < item.cost) {
      this.returnItemToOrigin(item, `Koin Kebaikan tidak mencukupi (${remaining} koin tersisa).`);
      return;
    }

    // 1. Sukses menempatkan objek
    this.playSound('stamp');
    this.spawnSparkleBurst(zone.x, zone.y, 10);

    // Tandai zona terisi
    zone.isOccupied = true;
    zone.placedItem = item;
    item.currentZone = zone;

    // Perbarui alokasi koin
    this.allocations[zone.aidOptionId] = item.cost;
    this.totalSpent = Object.values(this.allocations).reduce((a, b) => a + b, 0);

    // Kunci posisi item di tengah zona
    this.tweens.add({
      targets: item,
      x: zone.x,
      y: zone.y,
      scale: 1.05,
      duration: this.isReducedMotion ? 50 : 250,
      ease: 'Back.easeOut',
    });

    // Hilangkan label instruksi zona & ubah visual
    zone.label.setVisible(false);
    zone.visualBox.clear();
    zone.visualBox.lineStyle(3, 0x10B981, 0.9);
    zone.visualBox.strokeRoundedRect(zone.x - zone.width/2, zone.y - zone.height/2, zone.width, zone.height, 8);

    // 2. Perubahan Lingkungan Kelas & Reaksi Karakter Nyata
    this.applyWorldTransformation();

    // 3. Tambahkan tombol interaktif "Kembalikan" di atas item
    this.createReturnButton(item, zone);

    // 4. Update data ke React
    const isPriorityDone = this.allocations['opt_buku'] > 0;
    this.broadcastGameState(
      isPriorityDone
        ? 'Alhamdulillah! Buku pelajaran sudah rapi di meja. Sahabat kelas tersenyum bahagia!'
        : `Bantuan ${item.itemTitle} berhasil disalurkan!`
    );
  }

  createReturnButton(item, zone) {
    const returnBtn = this.add.container(zone.x + zone.width/2 - 14, zone.y - zone.height/2 + 14);
    returnBtn.setSize(24, 24);
    returnBtn.setDepth(180);

    const bg = this.add.graphics();
    bg.fillStyle(0xEF4444, 1);
    bg.fillCircle(0, 0, 11);
    bg.lineStyle(1.5, 0xFFFFFF, 1);
    bg.strokeCircle(0, 0, 11);
    returnBtn.add(bg);

    const txt = this.add.text(0, 0, '↩', {
      fontSize: '12px',
      color: '#FFFFFF',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    returnBtn.add(txt);

    returnBtn.setInteractive({ useHandCursor: true });
    returnBtn.on('pointerdown', () => {
      this.removeItemFromZone(item, zone, returnBtn);
    });

    item.returnBtn = returnBtn;
  }

  removeItemFromZone(item, zone, returnBtn) {
    this.playSound('tap');
    if (returnBtn) returnBtn.destroy();

    zone.isOccupied = false;
    zone.placedItem = null;
    zone.label.setVisible(true);
    zone.visualBox.clear();
    zone.visualBox.lineStyle(2, 0x3B82F6, 0.7);
    zone.visualBox.strokeRoundedRect(zone.x - zone.width/2, zone.y - zone.height/2, zone.width, zone.height, 8);

    // Reset koin
    this.allocations[zone.aidOptionId] = 0;
    this.totalSpent = Object.values(this.allocations).reduce((a, b) => a + b, 0);

    // Kembalikan objek ke tray persediaan
    this.tweens.add({
      targets: item,
      x: item.originX,
      y: item.originY,
      scale: item.originalScale,
      duration: this.isReducedMotion ? 50 : 250,
      ease: 'Back.easeOut',
    });

    this.applyWorldTransformation();
    this.broadcastGameState(`Bantuan ${item.itemTitle} ditarik kembali ke persediaan.`);
  }

  applyWorldTransformation() {
    const hasBuku = this.allocations['opt_buku'] > 0;
    const hasSeragam = this.allocations['opt_seragam'] > 0;

    // Genangan air meja menghilang jika buku sudah ditata
    if (hasBuku) {
      this.deskPuddle.clear();
    } else {
      this.deskPuddle.fillStyle(0x60A5FA, 0.6);
      this.deskPuddle.fillEllipse(385, 235, 60, 20);
      this.deskPuddle.fillStyle(0x93C5FD, 0.8);
      this.deskPuddle.fillEllipse(410, 245, 30, 12);
    }

    // Karakter bereaksi
    if (hasBuku && hasSeragam) {
      this.studentChar.setTexture('char_student_happy');
      this.speechText.setText('Hore! Siap ujian dengan riang!');
      this.chalkNote.setText('Alhamdulillah! Kebutuhan pokok murid terpenuhi!\nPohon Kebaikanmu bertunas gembira!');
      this.chalkNote.setColor('#FEF08A');
    } else if (hasBuku) {
      this.studentChar.setTexture('char_student_happy');
      this.speechText.setText('Terima kasih bukunya! ✨');
      this.chalkNote.setText('Buku siap! Murid sudah bisa belajar.');
    } else {
      this.studentChar.setTexture('char_student_worry');
      this.speechText.setText('Bukuku basah kuyup...');
      this.chalkNote.setText('Misi: Sedekah Perlengkapan Belajar\nUjian sekolah dimulai minggu depan!');
      this.chalkNote.setColor('#A7F3D0');
    }
  }

  broadcastGameState(tipMessage) {
    const hasBuku = this.allocations['opt_buku'] >= 50;
    const remaining = this.initialCoins - this.totalSpent;

    this.emitStateUpdate({
      allocations: { ...this.allocations },
      coinsSpent: this.totalSpent,
      remainingCoins: remaining,
      // Minimal kebutuhan pokok buku terpenuhi agar bisa menyelesaikan misi
      canComplete: hasBuku,
      activeTip: tipMessage,
      placedCount: Object.values(this.allocations).filter((v) => v > 0).length,
    });
  }
}
