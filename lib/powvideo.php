<?php
/* JavaScript PHP UnPacker 
 * @lscofield
 * GNU
 */

class JavaScriptUnpacker
{
    private $unbaser;
    private $payload;
    private $symtab;
    private $radix;
    private $count;

    function Detect($source)
    {
        $source = preg_replace("/ /", "", $source);
        preg_match("/eval\(function\(p,a,c,k,e,[r|d]?/", $source, $res);

        return (count($res) > 0);
    }

    function Unpack($source)
    {
        preg_match_all("/}\('(.*)', *(\d+), *(\d+), *'(.*?)'\.split\('\|'\)/", $source, $out);


        // Payload
        $this->payload = $out[1][0];
        // Words
        $this->symtab = preg_split("/\|/", $out[4][0]);

        // Radix
        $this->radix = (int) $out[2][0];

        // Words Count
        $this->count = (int) $out[3][0];


        if ($this->count != count($this->symtab)) return; // Malformed p.a.c.k.e.r symtab !

        //ToDo: Try catch
        $this->unbaser = new Unbaser($this->radix);

        $result = preg_replace_callback(
            '/\b\w+\b/',
            array($this, 'Lookup'),
            $this->payload
        );
        $result = str_replace('\\', '', $result);

        $this->ReplaceStrings($result);
        return $result;
    }

    function Lookup($matches)
    {
        $word = $matches[0];
        $ub = $this->symtab[$this->unbaser->Unbase($word)];
        $ret = !empty($ub) ? $ub : $word;
        return $ret;
    }

    function ReplaceStrings($source)
    {
        preg_match_all("/var *(_\w+)\=\[\"(.*?)\"\];/", $source, $out);
    }
}

class Unbaser
{
    private $base;
    private $dict;
    private $selector = 52;
    private $ALPHABET = array(
        52 => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP',
        54 => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQR',
        62 => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        95 => ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
    );


    function __construct($base)
    {
        $this->base = $base;

        if ($this->base > 62) $this->selector = 95;
        else if ($this->base > 54) $this->selector = 62;
        else if ($this->base > 52) $this->selector = 54;
    }

    function Unbase($val)
    {
        if (2 <= $this->base && $this->base <= 36) {
            return intval($val, $this->base);
        } else {
            if (!isset($this->dict)) {

                $this->dict = array_flip(str_split($this->ALPHABET[$this->selector]));
            }
            $ret = 0;
            $valArray = array_reverse(str_split($val));

            for ($i = 0; $i < count($valArray); $i++) {
                $cipher = $valArray[$i];
                $ret += pow($this->base, $i) * $this->dict[$cipher];
            }
            return $ret;
            // UnbaseExtended($x, $base)
        }
    }
}

function powvideo($source)
{
    $h = base64_decode($source);
    $link = '';
    $mod = '';

    include("jsabc.php");
    $jsu   = new JavaScriptUnpacker();
    $out   = $jsu->Unpack($h);
    if (preg_match('/([http|https][\.\d\w\-\.\/\\\:\?\&\#\%\_]*(\.mp4|\.m3u8))/', $out, $m)) {
        $link = $m[1];
        $t1   = explode("/", $link);
        $a145 = $t1[3];
        if (preg_match('/([\.\d\w\-\.\/\\\:\?\&\#\%\_]*(\.(srt|vtt)))/', $out, $xx)) {
            $srt = $xx[1];
            if (strpos("http", $srt) === false && $srt)
                $srt = "https://powvideo.net" . $srt;
        }
        $enc = $h;
        $dec = jsabc($enc);
        $dec = str_replace("Math.", "", $dec);
        $dec = preg_replace_callback(
            "/Math\[(.*?)\]/",
            function ($matches) {
                return preg_replace("/(\s|\"|\+)/", "", $matches[1]);;
            },
            $dec
        );
        $dec = preg_replace_callback(
            "/\[([a-dt\"\+]+)\]/",
            function ($matches) {
                return "." . preg_replace("/(\s|\"|\+)/", "", $matches[1]);;
            },
            $dec
        );
        $dec = str_replace("PI", "M_PI", $dec);
        $dec = preg_replace("/\/\*.*?\*\//", "", $dec);  // /* ceva */

        if (preg_match_all("/(\\$\(\s*\"\s*([a-zA-Z0-9_\.\:\_\-]+)\s*\"\)\.data\s*\(\s*\"(\w+)\")\s*\,([a-zA-Z0-9-\s\+\)\(\"]+)\)/", $dec, $m)) {

            for ($k = 0; $k < count($m[0]); $k++) {
                $orig = $m[0][$k];
                $rep = $m[1][$k];
                $func = $m[3][$k];
                $val = $m[4][$k];
                $func = str_replace(" ", "_", $func);
                $dec = str_replace($orig, "\$" . $func . "=" . $val, $dec) . ";";
                $dec = str_replace($rep . ")", "\$" . $func, $dec);
            }
        }
        if (preg_match("/((r\=)|(r\.splice)(.*?))\';eval/ms", $dec, $m)) {
            $rez = $m[1];
            $rez = preg_replace("/r\.splice\s*\(/", "array_splice(\$r,", $rez);
            $rez = preg_replace("/r\s*\[/", "\$r[", $rez);
            $rez = preg_replace("/r\s*\[/", "", $rez);
            $rez = str_replace("1+\"1\"", "11", $rez);
            $rez = preg_replace("/r\s*\=/", "\$r=", $rez);
            $rez = str_replace("-oi", "-\$oi", $rez);
            $rez = str_replace("op(", "sqrt(", $rez);
            $rez = str_replace("oe(", "sqrt(", $rez);
            $rez = str_replace("[oe](od)", ".data()", $rez);
            $rez = str_replace("\$r[\"splice\"](", "array_splice(\$r,", $rez);


            $_op_ = '';

            if (preg_match_all("/var\s*op\s*=\s*(.*?);/s", $rez, $m)) {

                for ($k = 0; $k < count($m[0]); $k++) {
                    $orig = $m[0][$k];

                    $rez = str_replace($orig, "\$" . str_replace('"', '', explode(",", $m[1][$k])[1]) . ";", $rez);
                }
            }



            if (preg_match_all("/\\$\"splice\"\]\(\\$\s*\(\"div:first\"\).data(.*?),(.*?)\)\s*\[.*?]\)/s", $rez, $m)) {
                for ($k = 0; $k < count($m[0]); $k++) {
                    $orig = $m[0][$k];
                    $_op_ = "od";
                    $inner = explode(",", $m[2][$k]);
                    $num = trim($inner[0]);
                    $arr = "\$m0";
                    if (preg_match_all("/array_splice\(.*?\)/s", $rez, $ar)) {
                        $arr = explode(",", $ar[0][$k + 1])[1];
                    }

                    $rep = "array_splice(\$r, \$$_op_," . $num . ",\$r[" . $arr . "])[0])";
                    $rep = str_replace("\$\$", "\$r[\$", $rep);
                    $rez = preg_replace("/" . preg_quote($orig, '/') . "/", $rep, $rez, 1);
                }
            }

            if (preg_match_all("/var\s*$_op_\s*=\s*(.*?)\s*;/s", $rez, $m)) {

                for ($k = 0; $k < count($m[0]); $k++) {
                    $orig = $m[0][$k];
                    $rez = str_replace($orig, "", $rez);
                    $rr = "\$" . str_replace('"', "", explode(",", $m[1][$k])[0]);
                    $rez = implode($rr, explode("\$$_op_", $rez, 2));
                }
            }
            $r = str_split(strrev($a145));

            if(preg_match_all("/sqrt\(\/.*?:.*?\).*?\)/s", $rez, $m)){
                for ($k = 0; $k < count($m[0]); $k++) {
                    $orig = $m[0][$k];
                    $rez = str_replace($orig, "sqrt(".explode("?",explode(":", $orig)[0])[2].")", $rez);
                }
            }
            eval($rez);
            $x    = implode($r);
            $link = str_replace($a145, $x, $link);
        } else {
            $link = "";
        }
    } else {
        $link = "";
    }

    return $link;
}
