import os
import glob
from PIL import Image

try:
    import pytesseract
    print("pytesseract is installed.")
except ImportError:
    pytesseract = None
    print("pytesseract is not installed.")

media_dir = "C:\\Users\\Takemichi\\.gemini\\antigravity\\brain\\539ab8e5-8da5-46aa-a173-5815a632507b"
images = sorted(glob.glob(os.path.join(media_dir, "media__1783446*.*")))

for img_path in images:
    print(f"\nProcessing {os.path.basename(img_path)}:")
    try:
        img = Image.open(img_path)
        print("Image size:", img.size)
        
        if pytesseract:
            # Run OCR on the whole image
            text = pytesseract.image_to_string(img)
            print("OCR Text:\n", text)
        else:
            print("Cannot run OCR: pytesseract not available.")
    except Exception as e:
        print("Error processing image:", e)
