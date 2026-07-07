from PIL import Image

img_path = "C:\\Users\\Takemichi\\.gemini\\antigravity\\brain\\539ab8e5-8da5-46aa-a173-5815a632507b\\strip_real_id.png"
img = Image.open(img_path).convert('L') # Convert to grayscale

# We know the text "AKfycbw..." is in the second line. Let's crop it tightly.
# Let's crop the text area: x from 10 to 600, y from 40 to 65
w, h = img.size
text_img = img.crop((12, 38, 620, 68))
text_img.save("C:\\Users\\Takemichi\\.gemini\\antigravity\\brain\\539ab8e5-8da5-46aa-a173-5815a632507b\\text_crop.png")

# Now let's print a text representation (low-res ASCII) to the logs
tw, th = text_img.size
# Resize to make it readable in ASCII (e.g. height 20 chars, aspect ratio preserved)
scale = 0.5
ascii_img = text_img.resize((int(tw * scale), int(th * scale * 1.8)))

aw, ah = ascii_img.size
pixels = ascii_img.load()

# Use threshold to determine character pixel or empty space
threshold = 128
for y in range(ah):
    line = ""
    for x in range(aw):
        val = pixels[x, y]
        # Dark pixels are characters
        if val < threshold:
            line += "#"
        else:
            line += " "
    print(line)
