$htmlFiles = Get-ChildItem -Filter "*.html"
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -notmatch 'supplement\.css') {
        $content = $content -replace '(<link rel="stylesheet" href="css/components\.css"/>)', '$1
  <link rel="stylesheet" href="css/supplement.css"/>'
        Set-Content $file.FullName $content -NoNewline
        Write-Host "Updated: $($file.Name)"
    } else {
        Write-Host "Already has supplement: $($file.Name)"
    }
}
