Add-Type -AssemblyName System.Drawing

function Create-ApertureBitmap([int]$size) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Background #FAF9F6
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(250, 249, 246))
    $g.FillRectangle($bgBrush, 0, 0, $size, $size)

    # Ink #18181B
    $inkColor = [System.Drawing.Color]::FromArgb(24, 24, 27)
    $inkBrush = New-Object System.Drawing.SolidBrush($inkColor)
    $outerPen = New-Object System.Drawing.Pen($inkColor, [Math]::Max(1.5, $size * 0.055))
    $innerPen = New-Object System.Drawing.Pen($inkColor, [Math]::Max(1.2, $size * 0.045))

    # Outer circle
    $outerMargin = $size * 0.12
    $outerSize = $size - ($outerMargin * 2)
    $g.DrawEllipse($outerPen, [float]$outerMargin, [float]$outerMargin, [float]$outerSize, [float]$outerSize)

    # Inner circle
    $innerMargin = $size * 0.34
    $innerSize = $size - ($innerMargin * 2)
    $g.DrawEllipse($innerPen, [float]$innerMargin, [float]$innerMargin, [float]$innerSize, [float]$innerSize)

    # Center dot
    $centerMargin = $size * 0.44
    $centerSize = $size - ($centerMargin * 2)
    $g.FillEllipse($inkBrush, [float]$centerMargin, [float]$centerMargin, [float]$centerSize, [float]$centerSize)

    # Blades
    $bladePen = New-Object System.Drawing.Pen($inkColor, [Math]::Max(1.0, $size * 0.038))
    $cx = $size / 2.0
    $cy = $size / 2.0
    $r1 = $innerSize / 2.0
    $r2 = $outerSize / 2.0

    for ($i = 0; $i -lt 6; $i++) {
        $angle1 = ($i * 60) * [Math]::PI / 180.0
        $angle2 = ($i * 60 + 35) * [Math]::PI / 180.0
        $x1 = $cx + $r2 * [Math]::Cos($angle1)
        $y1 = $cy + $r2 * [Math]::Sin($angle1)
        $x2 = $cx + $r1 * [Math]::Cos($angle2)
        $y2 = $cy + $r1 * [Math]::Sin($angle2)
        $g.DrawLine($bladePen, [float]$x1, [float]$y1, [float]$x2, [float]$y2)
    }

    $g.Dispose()
    return $bmp
}

$targetDir = Join-Path (Get-Location) "public"

# Generate 48x48 icon and save as favicon.ico
$bmp48 = Create-ApertureBitmap 48
$hIcon = $bmp48.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$icoPath = Join-Path $targetDir "favicon.ico"
$stream = [System.IO.File]::Create($icoPath)
$icon.Save($stream)
$stream.Close()
$icon.Dispose()

# Generate 32x32 PNG
$bmp32 = Create-ApertureBitmap 32
$bmp32.Save((Join-Path $targetDir "favicon-32x32.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp32.Dispose()

# Generate 16x16 PNG
$bmp16 = Create-ApertureBitmap 16
$bmp16.Save((Join-Path $targetDir "favicon-16x16.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp16.Dispose()

# Generate 180x180 Apple Touch Icon PNG
$bmp180 = Create-ApertureBitmap 180
$bmp180.Save((Join-Path $targetDir "apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp180.Dispose()

Write-Host "Favicons generated successfully in $targetDir"
