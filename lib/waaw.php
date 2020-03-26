<?php


function waaw($filelink)
{
    $pattern = "@(?:\/\/|\.)((?:waaw1?|netu|hqq|hindipix)\.(?:tv|watch|in))\/(?:watch_video\.php\?v|.+?vid)=([a-zA-Z0-9]+)@";
    if (preg_match($pattern, $filelink, $m)) {
        $vid = $m[2];
        $l = "http://hqq.tv/player/get_md5.php?ver=0&secure=0&adb=0/&v=" . $vid . "&token=&gt=&wasmcheck=1";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $l);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            /*"REMOTE_ADDR: $ip", "HTTP_X_FORWARDED_FOR: $ip", "X-Forwarded-For: $ip", "HTTP_X_REAL_IP: $ip", "X_FORWARDED_FOR: $ip",*/
            'x-requested-with: XMLHttpRequest'
        ));
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_REFERER, "http://hqq.watch/");
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 6);
        curl_setopt($ch, CURLOPT_TIMEOUT, 9);
        curl_setopt($ch, CURLOPT_HEADER, 1);

        $h = curl_exec($ch);
        curl_close($ch);

        preg_match("!\r\n(?:Location|URI): *(.*?) *\r\n!", $h, $matches);
        $link = $matches[1];

        if ($link)
            return $link;
        else
            return '';
    }
}
