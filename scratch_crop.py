import os
import glob
from PIL import Image

media_dir = "C:\\Users\\Takemichi\\.gemini\\antigravity\\brain\\539ab8e5-8da5-46aa-a173-5815a632507b"
images = sorted(glob.glob(os.path.join(media_dir, "media__1783445*.png")) + glob.glob(os.path.join(media_dir, "media__1783446*.png")))

out_dir = "C:\\Users\\Takemichi\\.gemini\\antigravity\\brain\\539ab8e5-8da5-46aa-a173-5815a632507b"

print("Found images:", [os.path.basename(p) for p in images])

for i, img_path in enumerate(images):
    try:
        img = Image.open(img_path)
        # Crop the bottom half or the middle area where text usually resides
        w, h = img.size
        # Save a few different crops to capture the text area
        crop_box = (0, 0, w, h)
        cropped = img.crop(crop_box)
        out_name = f"inspect_crop_{i}_{os.path.basename(img_path)}"
        cropped.save(os.path.join(out_dir, out_name))
        print(f"Saved {out_name} with size {img.size}")
    except Exception as e:
        print(f"Error {img_path}: {e}")
