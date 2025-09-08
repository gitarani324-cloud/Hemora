# Hemora Intro Animation Assets

This directory contains the assets for the cinematic intro animation.

## Blender GLB Export Guidelines

For the best results with the 3D droplet animation, follow these Blender export settings:

### Export Settings
1. **File Format**: glTF Binary (.glb)
2. **Include**: 
   - Selected Objects
   - Custom Properties
   - Cameras (if needed)
   - Punctual Lights

### Geometry Settings
- **Apply Modifiers**: ✓ Enabled
- **UVs**: ✓ Enabled  
- **Normals**: ✓ Enabled
- **Tangents**: ✓ Enabled
- **Vertex Colors**: ✓ Enabled (if used)

### Materials & Textures
- **Materials**: Export
- **Images**: Automatic (embeds textures)
- **Compression**: Enabled for smaller file size

### Animation Settings
- **Use Current Frame**: ✗ Disabled
- **Animations**: ✓ Enabled
- **Limit to Playback Range**: ✓ Enabled
- **Always Sample Animations**: ✓ Enabled
- **Group by NLA Track**: ✗ Disabled
- **Bake All Object Transforms**: ✓ Enabled (for complex rigs)

### Optimization Tips
1. **Decimate high-poly models** before export (aim for <50k triangles total)
2. **Bake complex materials** to simple PBR textures
3. **Use power-of-2 texture sizes** (512x512, 1024x1024, etc.)
4. **Limit animation to 3-5 seconds** for web performance
5. **Test file size** - keep under 5MB for fast loading

### Recommended Animation
- **Duration**: 3-4 seconds
- **Content**: Blood droplet falling and creating splash/ripple effect
- **Camera**: Static or gentle movement
- **Lighting**: Baked or simple setup (will be enhanced in three.js)

## MP4 Fallback Guidelines

If GLB is not available, provide an MP4 video:

### Video Specifications
- **Resolution**: 1920x1080 (1080p)
- **Codec**: H.264
- **Frame Rate**: 30fps or 60fps
- **Duration**: 3-4 seconds
- **Audio**: None (muted)
- **Compression**: Web-optimized, aim for <10MB

### Export Settings
- **Format**: MP4
- **Profile**: High
- **Bitrate**: 8-12 Mbps for high quality
- **Keyframe Interval**: 2 seconds

## File Naming
- Primary: `hemora_intro.glb`
- Fallback: `hemora_intro.mp4`
- Poster: `hemora_poster.jpg` (optional static fallback)

## Testing
1. Place your exported file in this directory
2. Navigate to `/intro` in the application
3. The intro should auto-detect and play your animation
4. Test the Skip button functionality
5. Verify smooth transition to landing page