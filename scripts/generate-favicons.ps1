Add-Type -AssemblyName System.Drawing

function Create-InitialBitmap([int]$size) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Background #FAF9F6
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(250, 249, 246))
    $g.FillRectangle($bgBrush, 0, 0, $size, $size)

    # Subtle border line
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(35, 24, 24, 27), 1.0)
    $g.DrawRectangle($borderPen, 0, 0, $size - 1, $size - 1)

    # Ink #18181B for JL
    $inkColor = [System.Drawing.Color]::FromArgb(24, 24, 27)
    $inkBrush = New-Object System.Drawing.SolidBrush($inkColor)

    # Font size proportional to canvas
    $fontSize = [float]($size * 0.50)
    $font = New-Object System.Drawing.Font("Georgia", $fontSize, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

    $stringFormat = New-Object System.Drawing.StringFormat
    $stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
    $stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center

    # Slight upward offset for optical centering of serif capital letters
    $yOffset = -($size * 0.02)
    $rect = New-Object System.Drawing.RectangleF(0, $yOffset, $size, $size)
    $g.DrawString("JL", $font, $inkBrush, $rect, $stringFormat)

    $font.Dispose()
    $inkBrush.Dispose()
    $bgBrush.Dispose()
    $borderPen.Dispose()
    $g.Dispose()

    return $bmp
}

$targetDir = Join-Path (Get-Location) "public"

# Generate 48x48 icon and save as favicon.ico
$bmp48 = Create-InitialBitmap 48
$hIcon = $bmp48.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$icoPath = Join-Path $targetDir "favicon.ico"
$stream = [System.IO.File]::Create($icoPath)
$icon.Save($stream)
$stream.Close()
$icon.Dispose()
$bmp48.Dispose()

# Generate 32x32 PNG
$bmp32 = Create-InitialBitmap 32
$bmp32.Save((Join-Path $targetDir "favicon-32x32.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp32.Dispose()

# Generate 16x16 PNG
$bmp16 = Create-InitialBitmap 16
$bmp16.Save((Join-Path $targetDir "favicon-16x16.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp16.Dispose()

# Generate 180x180 Apple Touch Icon PNG
$bmp180 = Create-InitialBitmap 180
$bmp180.Save((Join-Path $targetDir "apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp180.Dispose()

Write-Host "JL Initial Favicons generated successfully in $targetDir"
