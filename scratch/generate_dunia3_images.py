"""
Generate distinctive, storybook-quality 1920x1080 illustrations for Dunia 3:
- level14_buku_catatan.jpg (Buku Catatan Kas Amanah)
- level15_detektif_bukti.jpg (Detektif Bukti Nota & Kuitansi)
- level16_jembatan_rencana.jpg (Jembatan Rencana vs Realisasi Anggaran)
- level17_pemeriksa_klaim.jpg (Pemeriksa Klaim & Dokumen Hak Bantuan)
- level18_benteng_aset.jpg (Benteng Perlindungan Aset Wakaf)
- level19_laporan_dampak.jpg (Laporan Dampak Transparansi Publik)
- level20_misi_akhir.jpg (Misi Akhir Terpadu — Puncak Penjaga Amanah)
"""

import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

TARGET_DIR = 'public/images'

# Load reference assets
wmap = Image.open('public/images/world_map_adventure.jpg').convert('RGBA')
tree_mesh = Image.open('public/images/Meshy_AI_pohon_kebaikan_refined.png').convert('RGBA')
ref = Image.open('refrensi.png').convert('RGBA')

# Crop the majestic Penjaga Amanah palace from wmap:
# wmap size: (1376, 768)
palace_crop = wmap.crop((750, 40, 1370, 680)).resize((1920, 1080), Image.Resampling.LANCZOS)

# Create World 3 atmospheric base background
def create_dunia3_base(tint_color=(124, 58, 237), blend_alpha=0.35, brightness=1.05):
    base = palace_crop.copy()
    overlay = Image.new('RGBA', (1920, 1080), (*tint_color, int(255 * blend_alpha)))
    composed = Image.alpha_composite(base, overlay)
    
    # Enhance warmth and contrast
    enhancer = ImageEnhance.Color(composed.convert('RGB'))
    composed = enhancer.enhance(1.2).convert('RGBA')
    enhancer_b = ImageEnhance.Brightness(composed.convert('RGB'))
    composed = enhancer_b.enhance(brightness).convert('RGBA')
    return composed

# Vignette overlay
def apply_vignette(img, color=(20, 15, 45, 120)):
    w, h = img.size
    vignette = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(vignette)
    
    # Draw radial gradient border
    steps = 40
    for i in range(steps):
        alpha = int(color[3] * (1.0 - (i / steps) ** 1.5))
        box = [i * (w // 100), i * (h // 100), w - i * (w // 100), h - i * (h // 100)]
        draw.rectangle(box, outline=(color[0], color[1], color[2], alpha), width=w // 100)
    
    return Image.alpha_composite(img, vignette)

# -----------------------------------------------------------------------------
# LEVEL 14: BUKU CATATAN AMANAH
# -----------------------------------------------------------------------------
def make_level14():
    base = create_dunia3_base(tint_color=(79, 70, 229), blend_alpha=0.28) # Indigo tint
    draw = ImageDraw.Draw(base)
    
    # Interior desk perspective at bottom
    desk_color = (139, 90, 43, 240)
    draw.polygon([(0, 620), (1920, 620), (1920, 1080), (0, 1080)], fill=desk_color)
    draw.line([(0, 620), (1920, 620)], fill=(217, 150, 80, 255), width=8)
    
    # Giant open ledger book in center
    book_w, book_h = 960, 420
    bx, by = 480, 650
    # Left page
    draw.rounded_rectangle([bx, by, bx + book_w // 2 - 10, by + book_h], radius=16, fill=(255, 253, 245, 250), outline=(180, 140, 90), width=4)
    # Right page
    draw.rounded_rectangle([bx + book_w // 2 + 10, by, bx + book_w, by + book_h], radius=16, fill=(255, 253, 245, 250), outline=(180, 140, 90), width=4)
    
    # Lines on pages
    for ly in range(by + 70, by + book_h - 40, 32):
        draw.line([bx + 30, ly, bx + book_w // 2 - 40, ly], fill=(210, 215, 225), width=2)
        draw.line([bx + book_w // 2 + 40, ly, bx + book_w - 30, ly], fill=(210, 215, 225), width=2)
        
    # Column lines
    draw.line([bx + 260, by + 60, bx + 260, by + book_h - 40], fill=(200, 180, 150), width=3)
    draw.line([bx + book_w // 2 + 250, by + 60, bx + book_w // 2 + 250, by + book_h - 40], fill=(200, 180, 150), width=3)
    
    # Title ribbons on pages
    draw.rounded_rectangle([bx + 30, by + 18, bx + 220, by + 52], radius=8, fill=(16, 185, 129, 230))
    draw.rounded_rectangle([bx + book_w // 2 + 40, by + 18, bx + book_w // 2 + 230, by + 52], radius=8, fill=(59, 130, 246, 230))
    
    # Golden seal of "AMANAH" stamp
    seal_x, seal_y = bx + book_w - 120, by + book_h - 80
    draw.ellipse([seal_x - 45, seal_y - 45, seal_x + 45, seal_y + 45], fill=(220, 38, 38, 220), outline=(254, 202, 202), width=4)
    draw.ellipse([seal_x - 36, seal_y - 36, seal_x + 36, seal_y + 36], outline=(255, 255, 255), width=2)
    
    # Coin jars & abacus on sides
    # Jar left
    draw.rounded_rectangle([180, 700, 340, 980], radius=24, fill=(255, 255, 255, 140), outline=(210, 230, 255, 220), width=5)
    for cy in range(820, 960, 25):
        for cx in range(210, 310, 32):
            draw.ellipse([cx, cy, cx + 24, cy + 20], fill=(245, 158, 11), outline=(217, 119, 6), width=2)
            
    # Abacus right
    draw.rounded_rectangle([1520, 720, 1780, 960], radius=14, fill=(120, 70, 30), outline=(70, 35, 15), width=6)
    for ay in range(760, 930, 40):
        draw.line([1535, ay, 1765, ay], fill=(220, 220, 220), width=3)
        for bead in [1570, 1600, 1680, 1720]:
            draw.ellipse([bead, ay - 12, bead + 24, ay + 12], fill=(217, 119, 6), outline=(146, 64, 14), width=2)
            
    final_img = apply_vignette(base, (30, 20, 60, 140)).convert('RGB')
    final_img.save(os.path.join(TARGET_DIR, 'level14_buku_catatan.jpg'), 'JPEG', quality=94)
    print('Created level14_buku_catatan.jpg')

# -----------------------------------------------------------------------------
# LEVEL 15: DETEKTIF BUKTI (Verifikasi Nota)
# -----------------------------------------------------------------------------
def make_level15():
    base = create_dunia3_base(tint_color=(67, 56, 202), blend_alpha=0.30)
    draw = ImageDraw.Draw(base)
    
    # Audit Desk at bottom
    draw.polygon([(0, 580), (1920, 580), (1920, 1080), (0, 1080)], fill=(75, 50, 35, 245))
    draw.line([(0, 580), (1920, 580)], fill=(180, 120, 75, 255), width=7)
    
    # Overlapping Receipts / Faktur
    receipts = [
        (420, 620, 280, 390, -10, (253, 251, 240)),
        (660, 600, 300, 420, 5, (255, 255, 255)),
        (920, 610, 290, 410, -4, (250, 248, 235)),
    ]
    for rx, ry, rw, rh, ang, col in receipts:
        # Simple paper box
        draw.rounded_rectangle([rx, ry, rx + rw, ry + rh], radius=10, fill=(*col, 250), outline=(200, 190, 170), width=3)
        # Header strip
        draw.rounded_rectangle([rx + 20, ry + 15, rx + rw - 20, ry + 48], radius=6, fill=(240, 235, 215))
        # Receipt lines
        for ly in range(ry + 65, ry + rh - 60, 26):
            draw.line([rx + 25, ly, rx + rw - 25, ly], fill=(215, 215, 220), width=2)
        # Total line
        draw.line([rx + 25, ry + rh - 55, rx + rw - 25, ry + rh - 55], fill=(160, 150, 140), width=3)
        # Green verified stamp
        draw.rounded_rectangle([rx + rw - 110, ry + rh - 50, rx + rw - 20, ry + rh - 15], radius=6, outline=(22, 163, 74), width=3)
        draw.ellipse([rx + rw - 100, ry + rh - 44, rx + rw - 82, ry + rh - 22], fill=(22, 163, 74))
    
    # GIANT DETECTIVE MAGNIFYING GLASS in center inspecting the receipt
    mg_cx, mg_cy = 820, 750
    mg_radius = 160
    # Glass glow
    draw.ellipse([mg_cx - mg_radius, mg_cy - mg_radius, mg_cx + mg_radius, mg_cy + mg_radius], 
                 fill=(224, 242, 254, 80), outline=(245, 158, 11), width=14)
    # Inner rim highlight
    draw.ellipse([mg_cx - mg_radius + 8, mg_cy - mg_radius + 8, mg_cx + mg_radius - 8, mg_cy + mg_radius - 8], 
                 outline=(254, 240, 138, 200), width=4)
    # Magnifier Handle
    draw.polygon([(mg_cx + 120, mg_cy + 120), (mg_cx + 280, mg_cy + 280), (mg_cx + 255, mg_cy + 305), (mg_cx + 95, mg_cy + 145)],
                 fill=(120, 53, 15), outline=(78, 29, 3), width=4)
    # Golden ring connector
    draw.ellipse([mg_cx + 105, mg_cy + 105, mg_cx + 140, mg_cy + 140], fill=(245, 158, 11))
    
    # Verified badge in magnifying glass view
    draw.rounded_rectangle([mg_cx - 90, mg_cy - 40, mg_cx + 90, mg_cy + 40], radius=12, fill=(22, 163, 74, 230), outline=(255, 255, 255), width=3)
    draw.line([mg_cx - 50, mg_cy + 5, mg_cx - 20, mg_cy + 25], fill=(255, 255, 255), width=6)
    draw.line([mg_cx - 20, mg_cy + 25, mg_cx + 50, mg_cy - 20], fill=(255, 255, 255), width=6)
    
    # Investigation checklist clipboard on the right
    draw.rounded_rectangle([1380, 610, 1720, 990], radius=16, fill=(180, 130, 80), outline=(110, 70, 35), width=5)
    draw.rounded_rectangle([1400, 650, 1700, 970], radius=10, fill=(255, 255, 255), outline=(220, 220, 220), width=2)
    # Metal clip
    draw.rounded_rectangle([1510, 595, 1590, 645], radius=6, fill=(160, 170, 180), outline=(100, 110, 120), width=3)
    # Checklist rows with green checkmarks
    for cky in range(690, 950, 50):
        draw.rectangle([1430, cky, 1460, cky + 30], outline=(16, 185, 129), width=3, fill=(236, 253, 245))
        draw.line([1436, cky + 16, 1445, cky + 24], fill=(16, 185, 129), width=3)
        draw.line([1445, cky + 24, 1455, cky + 8], fill=(16, 185, 129), width=3)
        draw.line([1480, cky + 15, 1670, cky + 15], fill=(100, 116, 139), width=4)
        
    final_img = apply_vignette(base, (25, 20, 55, 130)).convert('RGB')
    final_img.save(os.path.join(TARGET_DIR, 'level15_detektif_bukti.jpg'), 'JPEG', quality=94)
    print('Created level15_detektif_bukti.jpg')

# -----------------------------------------------------------------------------
# LEVEL 16: JEMBATAN RENCANA-NYATA (Evaluasi & Kesenjangan)
# -----------------------------------------------------------------------------
def make_level16():
    base = create_dunia3_base(tint_color=(109, 40, 217), blend_alpha=0.32) # Violet tint
    draw = ImageDraw.Draw(base)
    
    # Grand stone bridge spanning across bottom center connecting Plan vs Reality
    bridge_y = 660
    # Left pillar / Island (Rencana)
    draw.polygon([(0, 600), (550, 600), (450, 1080), (0, 1080)], fill=(40, 45, 65, 245))
    draw.line([(0, 600), (550, 600)], fill=(59, 130, 246), width=6)
    
    # Right pillar / Island (Kenyataan Lapangan)
    draw.polygon([(1370, 600), (1920, 600), (1920, 1080), (1470, 1080)], fill=(40, 45, 65, 245))
    draw.line([(1370, 600), (1920, 600)], fill=(16, 185, 129), width=6)
    
    # Arched stone bridge in between
    draw.ellipse([450, 620, 1470, 940], fill=(70, 75, 95, 240), outline=(148, 163, 184), width=6)
    draw.ellipse([550, 720, 1370, 1060], fill=(20, 25, 45, 255)) # Water under arch
    
    # Bridge walkway
    draw.rounded_rectangle([420, 620, 1500, 660], radius=10, fill=(226, 232, 240), outline=(148, 163, 184), width=4)
    # Lanterns on bridge
    for lx in [620, 960, 1300]:
        draw.rectangle([lx - 8, 570, lx + 8, 620], fill=(71, 85, 105))
        draw.ellipse([lx - 16, 545, lx + 16, 575], fill=(251, 191, 36), outline=(245, 158, 11), width=2)
        
    # Floating Holographic Analytical Board in Center Sky
    bx, by, bw, bh = 560, 220, 800, 380
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=24, fill=(15, 23, 42, 230), outline=(139, 92, 246), width=4)
    
    # Title bar
    draw.rounded_rectangle([bx + 20, by + 18, bx + bw - 20, by + 65], radius=14, fill=(30, 41, 59))
    draw.line([bx + 40, by + 42, bx + 360, by + 42], fill=(244, 244, 245), width=5)
    
    # Left Chart: Rencana Awal (Blue Bars)
    draw.rounded_rectangle([bx + 40, by + 90, bx + 360, by + 340], radius=16, fill=(30, 41, 59, 200), outline=(59, 130, 246), width=2)
    bars_plan = [160, 200, 130, 180]
    for idx, bh_val in enumerate(bars_plan):
        b_x = bx + 70 + idx * 70
        draw.rounded_rectangle([b_x, by + 320 - bh_val, b_x + 45, by + 320], radius=6, fill=(59, 130, 246))
        
    # Right Chart: Realisasi Nyata (Green Bars + Savings Highlight)
    draw.rounded_rectangle([bx + 440, by + 90, bx + 760, by + 340], radius=16, fill=(30, 41, 59, 200), outline=(16, 185, 129), width=2)
    bars_real = [150, 175, 120, 165]
    for idx, bh_val in enumerate(bars_real):
        b_x = bx + 470 + idx * 70
        draw.rounded_rectangle([b_x, by + 320 - bh_val, b_x + 45, by + 320], radius=6, fill=(16, 185, 129))
        
    # Glowing Arrow & Golden Scale in Center
    draw.polygon([(bx + 375, by + 200), (bx + 425, by + 215), (bx + 375, by + 230)], fill=(245, 158, 11))
    
    final_img = apply_vignette(base, (25, 15, 55, 130)).convert('RGB')
    final_img.save(os.path.join(TARGET_DIR, 'level16_jembatan_rencana.jpg'), 'JPEG', quality=94)
    print('Created level16_jembatan_rencana.jpg')

# -----------------------------------------------------------------------------
# LEVEL 17: PEMERIKSA KLAIM (Integritas Kas)
# -----------------------------------------------------------------------------
def make_level17():
    base = create_dunia3_base(tint_color=(79, 70, 229), blend_alpha=0.30)
    draw = ImageDraw.Draw(base)
    
    # Official Verification Counter Desk
    draw.polygon([(0, 600), (1920, 600), (1920, 1080), (0, 1080)], fill=(55, 65, 81, 250))
    draw.line([(0, 600), (1920, 600)], fill=(156, 163, 175), width=6)
    
    # Official Golden Shield on wall background
    sh_cx, sh_cy = 960, 400
    draw.polygon([(sh_cx - 90, sh_cy - 120), (sh_cx + 90, sh_cy - 120), (sh_cx + 90, sh_cy + 20), (sh_cx, sh_cy + 110), (sh_cx - 90, sh_cy + 20)],
                 fill=(245, 158, 11, 230), outline=(254, 240, 138), width=5)
    # Inner star
    draw.ellipse([sh_cx - 40, sh_cy - 50, sh_cx + 40, sh_cy + 30], fill=(255, 255, 255))
    
    # Applicant Dossiers on Counter
    dossiers = [
        (260, 640, 360, 400, 'Keluarga Prasejahtera 1'),
        (780, 630, 380, 410, 'Berkas Penerima Terverifikasi'),
        (1300, 640, 360, 400, 'Dokumen Pengajuan Hak'),
    ]
    for dx, dy, dw, dh, title in dossiers:
        # Folder back
        draw.rounded_rectangle([dx - 10, dy - 10, dx + dw + 10, dy + dh], radius=14, fill=(180, 130, 70), outline=(130, 80, 30), width=3)
        # Folder front paper
        draw.rounded_rectangle([dx, dy, dx + dw, dy + dh], radius=10, fill=(255, 255, 255), outline=(220, 220, 220), width=2)
        # ID Photo placeholder
        draw.rectangle([dx + 25, dy + 30, dx + 115, dy + 130], fill=(226, 232, 240), outline=(148, 163, 184), width=2)
        draw.ellipse([dx + 50, dy + 45, dx + 90, dy + 85], fill=(100, 116, 139))
        draw.chord([dx + 35, dy + 80, dx + 105, dy + 140], start=0, end=180, fill=(100, 116, 139))
        # Document text lines
        for ly in range(dy + 40, dy + 130, 22):
            draw.line([dx + 135, ly, dx + dw - 25, ly], fill=(148, 163, 184), width=3)
        for ly in range(dy + 155, dy + dh - 70, 24):
            draw.line([dx + 25, ly, dx + dw - 25, ly], fill=(203, 213, 225), width=2)
            
        # Large Official Green Verification Stamp: "SAH / LAYAK"
        draw.rounded_rectangle([dx + dw - 180, dy + dh - 75, dx + dw - 20, dy + dh - 20], radius=10, fill=(220, 252, 231, 230), outline=(22, 163, 74), width=4)
        draw.line([dx + dw - 155, dy + dh - 48, dx + dw - 135, dy + dh - 32], fill=(22, 163, 74), width=5)
        draw.line([dx + dw - 135, dy + dh - 32, dx + dw - 60, dy + dh - 62], fill=(22, 163, 74), width=5)
        
    final_img = apply_vignette(base, (20, 25, 55, 130)).convert('RGB')
    final_img.save(os.path.join(TARGET_DIR, 'level17_pemeriksa_klaim.jpg'), 'JPEG', quality=94)
    print('Created level17_pemeriksa_klaim.jpg')

# -----------------------------------------------------------------------------
# LEVEL 18: BENTENG ASET WAKAF (Perlindungan Aset)
# -----------------------------------------------------------------------------
def make_level18():
    base = create_dunia3_base(tint_color=(124, 58, 237), blend_alpha=0.35)
    draw = ImageDraw.Draw(base)
    
    # Sturdy stone fortress perimeter wall across mid-ground
    wall_y = 620
    draw.rectangle([0, wall_y, 1920, 1080], fill=(51, 65, 85, 250))
    # Fortress crenellations (battlement teeth)
    for bx in range(0, 1920, 100):
        draw.rectangle([bx, wall_y - 45, bx + 60, wall_y], fill=(71, 85, 105), outline=(100, 116, 139), width=3)
    draw.line([(0, wall_y), (1920, wall_y)], fill=(148, 163, 184), width=5)
    
    # Waqf Property Boundary Stone Marker Post (Patok Batas Tanah Wakaf) in foreground
    px, py, pw, ph = 300, 520, 220, 480
    draw.polygon([(px + 40, py), (px + pw - 40, py), (px + pw, py + 80), (px + pw, py + ph), (px, py + ph), (px, py + 80)],
                 fill=(226, 232, 240), outline=(148, 163, 184), width=6)
    # Engraved marker text banner
    draw.rounded_rectangle([px + 20, py + 120, px + pw - 20, py + 220], radius=10, fill=(30, 41, 59), outline=(245, 158, 11), width=4)
    # Golden Crescent / Mosque symbol on boundary post
    draw.ellipse([px + pw // 2 - 25, py + 40, px + pw // 2 + 25, py + 90], fill=(245, 158, 11))
    
    # Official Royal Waqf Deed Scroll (Sertifikat Tanah Wakaf Legal) mounted in center
    cx, cy, cw, ch = 760, 500, 780, 520
    draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=20, fill=(255, 251, 235), outline=(217, 119, 6), width=6)
    # Decorative border
    draw.rounded_rectangle([cx + 20, cy + 20, cx + cw - 20, cy + ch - 20], radius=14, outline=(245, 158, 11), width=2)
    # Scroll header
    draw.rounded_rectangle([cx + 80, cy + 45, cx + cw - 80, cy + 105], radius=10, fill=(254, 243, 199), outline=(217, 119, 6), width=3)
    # Golden Waqf seal
    draw.ellipse([cx + cw // 2 - 45, cy + ch - 120, cx + cw // 2 + 45, cy + ch - 30], fill=(217, 119, 6), outline=(254, 240, 138), width=4)
    # Lines on certificate
    for ly in range(cy + 130, cy + ch - 140, 28):
        draw.line([cx + 60, ly, cx + cw - 60, ly], fill=(180, 160, 130), width=3)
        
    final_img = apply_vignette(base, (25, 20, 55, 130)).convert('RGB')
    final_img.save(os.path.join(TARGET_DIR, 'level18_benteng_aset.jpg'), 'JPEG', quality=94)
    print('Created level18_benteng_aset.jpg')

# -----------------------------------------------------------------------------
# LEVEL 19: LAPORAN DAMPAK (Audit Publik Transparan)
# -----------------------------------------------------------------------------
def make_level19():
    base = create_dunia3_base(tint_color=(13, 148, 136), blend_alpha=0.28) # Teal/Emerald trust tint
    draw = ImageDraw.Draw(base)
    
    # Public Square Ground
    draw.polygon([(0, 680), (1920, 680), (1920, 1080), (0, 1080)], fill=(245, 235, 215, 250))
    draw.line([(0, 680), (1920, 680)], fill=(217, 180, 130), width=6)
    
    # Grand Transparency Community Bulletin Board (Papan Pengumuman Laporan Publik)
    bx, by, bw, bh = 360, 180, 1200, 640
    # Wooden frame
    draw.rounded_rectangle([bx - 20, by - 20, bx + bw + 20, by + bh + 20], radius=24, fill=(120, 53, 15), outline=(69, 26, 3), width=6)
    # Roof canopy of board
    draw.polygon([(bx - 40, by - 15), (bx + bw + 40, by - 15), (bx + bw // 2, by - 70)], fill=(180, 83, 9), outline=(120, 53, 15), width=4)
    # Board interior
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=16, fill=(255, 255, 255), outline=(229, 231, 235), width=3)
    
    # Board Title Banner
    draw.rounded_rectangle([bx + 40, by + 30, bx + bw - 40, by + 100], radius=14, fill=(13, 148, 136), outline=(20, 184, 166), width=3)
    
    # 3 Section Cards on Board
    # 1. Pie Chart: 100% Penyaluran Tepat Sasaran
    draw.rounded_rectangle([bx + 50, by + 130, bx + 390, by + 580], radius=16, fill=(240, 253, 250), outline=(94, 234, 212), width=3)
    pie_cx, pie_cy, pie_r = bx + 220, by + 280, 110
    draw.pieslice([pie_cx - pie_r, pie_cy - pie_r, pie_cx + pie_r, pie_cy + pie_r], start=0, end=140, fill=(13, 148, 136))
    draw.pieslice([pie_cx - pie_r, pie_cy - pie_r, pie_cx + pie_r, pie_cy + pie_r], start=140, end=260, fill=(14, 165, 233))
    draw.pieslice([pie_cx - pie_r, pie_cy - pie_r, pie_cx + pie_r, pie_cy + pie_r], start=260, end=360, fill=(245, 158, 11))
    draw.ellipse([pie_cx - 45, pie_cy - 45, pie_cx + 45, pie_cy + 45], fill=(255, 255, 255))
    
    # 2. Beneficiaries & Impact Stat Cards
    draw.rounded_rectangle([bx + 430, by + 130, bx + 770, by + 580], radius=16, fill=(240, 249, 255), outline=(125, 211, 252), width=3)
    for iy in range(by + 160, by + 540, 95):
        draw.rounded_rectangle([bx + 455, iy, bx + 745, iy + 75], radius=12, fill=(255, 255, 255), outline=(186, 230, 253), width=2)
        draw.ellipse([bx + 475, iy + 18, bx + 515, iy + 58], fill=(14, 165, 233))
        draw.line([bx + 535, iy + 30, bx + 725, iy + 30], fill=(15, 23, 42), width=5)
        draw.line([bx + 535, iy + 50, bx + 665, iy + 50], fill=(100, 116, 139), width=3)
        
    # 3. Official Audit Certificate & Donor Approval
    draw.rounded_rectangle([bx + 810, by + 130, bx + 1150, by + 580], radius=16, fill=(254, 252, 232), outline=(253, 224, 71), width=3)
    # Golden Star & Ribbon
    draw.ellipse([bx + 980 - 45, by + 180, bx + 980 + 45, by + 270], fill=(234, 179, 8), outline=(202, 138, 4), width=4)
    for ly in range(by + 310, by + 520, 26):
        draw.line([bx + 845, ly, bx + 1115, ly], fill=(161, 98, 7), width=3)
    draw.rounded_rectangle([bx + 870, by + 510, bx + 1090, by + 555], radius=10, fill=(22, 163, 74), outline=(187, 247, 208), width=2)
    
    final_img = apply_vignette(base, (15, 30, 45, 120)).convert('RGB')
    final_img.save(os.path.join(TARGET_DIR, 'level19_laporan_dampak.jpg'), 'JPEG', quality=94)
    print('Created level19_laporan_dampak.jpg')

# -----------------------------------------------------------------------------
# LEVEL 20: MISI AKHIR TERPADU (Grand Finale)
# -----------------------------------------------------------------------------
def make_level20():
    base = create_dunia3_base(tint_color=(245, 158, 11), blend_alpha=0.35, brightness=1.15) # Golden radiant glow
    
    # Place the majestic refined tree of kindness in grand center
    tree_resized = tree_mesh.resize((820, 820), Image.Resampling.LANCZOS)
    tree_x, tree_y = (1920 - 820) // 2, 1080 - 840
    base.alpha_composite(tree_resized, (tree_x, tree_y))
    
    draw = ImageDraw.Draw(base)
    
    # Grand Podium of Honor
    pod_y = 960
    draw.ellipse([360, pod_y - 60, 1560, pod_y + 160], fill=(217, 119, 6, 240), outline=(254, 240, 138), width=8)
    draw.ellipse([460, pod_y - 30, 1460, pod_y + 130], fill=(245, 158, 11, 240), outline=(254, 252, 232), width=4)
    
    # Golden Arch / Halo of Stars in the Sky
    center_x, center_y = 960, 420
    radius_arc = 560
    for i in range(13):
        angle = math.pi * 0.15 + (i / 12) * math.pi * 0.7
        sx = int(center_x + radius_arc * math.cos(angle))
        sy = int(center_y - radius_arc * math.sin(angle))
        # Draw golden star
        draw.ellipse([sx - 20, sy - 20, sx + 20, sy + 20], fill=(255, 255, 255), outline=(250, 204, 21), width=4)
        
    # Floating Golden Trophy / Cup on left
    tx, ty = 340, 620
    draw.polygon([(tx - 60, ty), (tx + 60, ty), (tx + 40, ty + 100), (tx, ty + 120), (tx - 40, ty + 100)], fill=(245, 158, 11), outline=(254, 240, 138), width=5)
    draw.rectangle([tx - 15, ty + 120, tx + 15, ty + 180], fill=(217, 119, 6))
    draw.rounded_rectangle([tx - 50, ty + 180, tx + 50, ty + 220], radius=8, fill=(180, 83, 9))
    
    # Floating Golden Medal of Honor on right
    mx, my = 1580, 620
    draw.ellipse([mx - 65, my - 65, mx + 65, my + 65], fill=(250, 204, 21), outline=(217, 119, 6), width=6)
    draw.ellipse([mx - 45, my - 45, mx + 45, my + 45], outline=(255, 255, 255), width=3)
    draw.polygon([(mx - 30, my + 65), (mx, my + 180), (mx - 60, my + 180)], fill=(220, 38, 38))
    draw.polygon([(mx + 30, my + 65), (mx, my + 180), (mx + 60, my + 180)], fill=(220, 38, 38))
    
    final_img = apply_vignette(base, (40, 20, 10, 110)).convert('RGB')
    final_img.save(os.path.join(TARGET_DIR, 'level20_misi_akhir.jpg'), 'JPEG', quality=94)
    print('Created level20_misi_akhir.jpg')

make_level14()
make_level15()
make_level16()
make_level17()
make_level18()
make_level19()
make_level20()
print('All 7 Dunia 3 images generated!')
