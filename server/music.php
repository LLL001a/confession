<?php
/**
 * 音乐流代理
 * 服务器端转发网易云音乐外链，解决 HTTPS 页面中 302 重定向到 http CDN
 * 被浏览器 Mixed Content(混合内容) 策略拦截，导致背景音乐无法播放的问题。
 *
 * 用法：/music.php?id=<网易云歌曲ID>
 * 例：/music.php?id=1899437032
 */
if (!isset($_GET['id']) || !preg_match('/^\d{5,12}$/', (string)$_GET['id'])) {
    http_response_code(400);
    header('Content-Type: text/plain; charset=utf-8');
    exit('invalid music id');
}
$id = (string)$_GET['id'];
$upstream = 'https://music.163.com/song/media/outer/url?id=' . $id . '.mp3';

$ch = curl_init($upstream);
if ($ch === false) {
    http_response_code(502);
    header('Content-Type: text/plain; charset=utf-8');
    exit('curl unavailable');
}
curl_setopt_array($ch, [
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS => 6,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_TIMEOUT => 90,
    CURLOPT_HTTPHEADER => [
        'Referer: https://music.163.com/',
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ],
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => 0,
]);
$data = curl_exec($ch);
$code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

if ($err !== '') {
    http_response_code(502);
    header('Content-Type: text/plain; charset=utf-8');
    exit('upstream error');
}

if ($code === 200 || $code === 206) {
    header('Content-Type: audio/mpeg');
    header('Content-Length: ' . strlen($data));
    header('Accept-Ranges: bytes');
    header('Cache-Control: public, max-age=3600');
    echo $data;
    exit;
}

http_response_code(502);
header('Content-Type: text/plain; charset=utf-8');
exit('upstream code: ' . $code);
