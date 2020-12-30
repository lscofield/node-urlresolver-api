<?php


function mystream($html)
{
    $h = base64_decode($html);
    $link = "";
    if (preg_match("@(\\$\=\~\[\].*?)\<script@si", $h, $u)) {
        $code = $u[0];
        $t1 = explode(";", $code);
        $js = $code;
        $t3 = substr($t1[1], 3);
        $c = explode(",", $t3);
        $x = "0,f,1,a,2,b,d,3,e,4,5,c,6,7,8,9";
        $y = explode(",", $x);
        $map = array();
        for ($k = 0; $k < count($c); $k++) {
            $a1 = explode(":", $c[$k]);
            $map[$y[$k]] = "$." . $a1[0];
        }
        $map['o'] = "$._$";
        $map['u'] = "$._";
        $map['t'] = "$.__";

        uasort($map, 'cmp');
        foreach ($map as $key => $value) {
            $js = str_replace($value, $key, $js);
        }
        $js = str_replace("+", "", $js);
        $js = str_replace('"', '', $js);
        $js = str_replace('(![])[2]', 'l', $js);
        $js = preg_replace_callback('@\\\\(\d{2,3})@', function ($c) {
            return chr(base_convert($c[1], 8, 10));
        }, $js);
        $js = str_replace("\\", "", $js);

        if (preg_match("/http.+\.(mp4|m3u8)/", $js, $m))
            $link = $m[0];
        else
            $link = "";
    } else
        $link = "";

    return $link;
}

function cmp($a, $b)
{
    if (strlen($a) == strlen($b)) {
        return 0;
    }
    return (strlen($a) > strlen($b)) ? -1 : 1;
}
