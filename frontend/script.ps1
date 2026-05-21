try {
  $r = Invoke-WebRequest -Uri 'https://week-9-10-kn3e.onrender.com/user-api/articles' -UseBasicParsing -Method GET -Headers @{ 'User-Agent'='check' }
  Write-Output ('GET_STATUS:' + $r.StatusCode)
  Write-Output $r.Content
} catch {
  Write-Output 'GET_EXCEPTION:'
  if ($_.Exception.Response) { try { $s = $_.Exception.Response.StatusCode.Value__; Write-Output ('Status:' + $s) } catch {} }
  Write-Output $_.Exception.Message
}
try {
  $body = @{ email='test@example.com'; password='password' } | ConvertTo-Json
  $r2 = Invoke-WebRequest -Uri 'https://week-9-10-kn3e.onrender.com/common-api/login' -UseBasicParsing -Method POST -Body $body -ContentType 'application/json' -Headers @{ 'User-Agent'='check' }
  Write-Output ('POST_STATUS:' + $r2.StatusCode)
  Write-Output $r2.Content
} catch {
  Write-Output 'POST_EXCEPTION:'
  if ($_.Exception.Response) { try { $s = $_.Exception.Response.StatusCode.Value__; Write-Output ('Status:' + $s) } catch {} }
  Write-Output $_.Exception.Message
}
