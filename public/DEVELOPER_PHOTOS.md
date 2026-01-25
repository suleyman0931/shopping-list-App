# Developer Photos Instructions

To display developer photos in the About Us modal, please add the following image files to the `public` folder:

## Required Files:
1. `suleyman.png` - Photo of Suleyman Abdu
2. `tesnim.png` - Photo of Tesnim

## Image Specifications:
- **Format**: PNG (recommended) or JPG
- **Size**: 200x200 pixels (minimum)
- **Aspect Ratio**: Square (1:1) for best results
- **File Size**: Keep under 500KB for fast loading

## File Locations:
```
public/
├── suleyman.png
├── tesnim.png
└── (other files...)
```

## Fallback Behavior:
If the image files are not found, the app will display emoji placeholders:
- 👨‍💻 for Suleyman
- 👩‍💻 for Tesnim

## Notes:
- Images will be automatically cropped to circular shape
- The app handles missing images gracefully
- Photos will be displayed in the About Us modal accessible from the hamburger menu