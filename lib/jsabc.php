<?php

function decode_code($code){
    return preg_replace_callback(
        "@\\\(x)?([0-9a-f]{2,3})@",
        function($m){
            return mb_convert_encoding(chr($m[1]?hexdec($m[2]):octdec($m[2])),'ISO-8859-1', 'UTF-8');
        },
        $code
    );
}
function abc($a52, $a10, &$mod)
{
    $a54 = array();
    $a55 = 0x0;
    $a56 = '';
    $a57 = '';
    $a58 = '';
    $a52 = base64_decode($a52);
    $a52 = mb_convert_encoding($a52, 'ISO-8859-1', 'UTF-8');
    for ($a72 = 0x0; $a72 < 0x100; $a72++) {
      eval ($mod);
    }

    for ($a72 = 0x0; $a72 < 0x100; $a72++) {
        $a55       = ($a55 + $a54[$a72] + ord($a10[($a72 % strlen($a10))])) % 0x100;
        $a56       = $a54[$a72];
        $a54[$a72] = $a54[$a55];
        $a54[$a55] = $a56;
    }
    $a72 = 0x0;
    $a55 = 0x0;
    for ($a100 = 0x0; $a100 < strlen($a52); $a100++) {
        $a72       = ($a72 + 0x1) % 0x100;
        $a55       = ($a55 + $a54[$a72]) % 0x100;
        $a56       = $a54[$a72];
        $a54[$a72] = $a54[$a55];
        $a54[$a55] = $a56;
        $xx        = $a54[($a54[$a72] + $a54[$a55]) % 0x100];
        $a57 .= chr(ord($a52[$a100]) ^ $xx);
    }
    return $a57;
}

function get_array(&$enc) {
 $pat1="(var\s*([a-z0-9_]+)(\=))";
 $pat2="(function\s*([a-z0-9_]+)(\(\)\{return))";
 $pat3="\[(\'[a-zA-Z0-9_\=\+\/\|\;\,\!\"\s\(\)\\\]+\'\,?){2,}\]";
 $pat_array="/(".$pat1."|".$pat2.")".$pat3."/ms";
 if (preg_match($pat_array,$enc,$m)) {
  $c=array();
  $x=0;
  $enc=str_replace($m[0],"",$enc);
  $code=str_replace($m[1],"\$c=",$m[0].";");
  eval ($code);
  $pat = "/\(" . $m[3].$m[6] . "\,([a-z0-9_]+)/";
  if (preg_match($pat, $enc, $n)) {   // rotate array
    $x = hexdec($n[1]);
    for ($k = 0; $k < $x; $k++) {
      array_push($c, array_shift($c));
    }
  }
  return $c;
 } else {
  return false;
 }
}
function replace_func($c,$first,&$enc,&$mod) {
 $pat_func="/([a-z0-9_]+)\(\'(0x\w+)\'\s?\,\s?\'(.*?)\'\)/ms";
 if (preg_match_all($pat_func,$enc,$f)) { // if abc('0x0,'dfgt')
  for ($z = 0; $z < count($f[0]); $z++) {
   if ($first)
    $rep=$f[1][0]."('".$f[2][$z]."','".$f[3][$z]."')";
   else
    $rep=$f[0][$z];
    $enc = str_replace($rep, "'".abc($c[hexdec($f[2][$z])], $f[3][$z], $mod)."'", $enc);
  }
  $enc=str_replace("'+'","",$enc); // concat string
  return true;
 } else {
  return false;
 }
}
function replace_func1($c,$first,&$enc,&$atob) {
 $pat_func1="/([a-z0-9_]+)\(\'(0x\w+)\'\)/ms";
 if (preg_match_all($pat_func1,$enc,$f)) { // if abc('0x0')
     for ($z = 0; $z < count($f[0]); $z++) {
      if ($first)
       $rep=$f[1][0]."('".$f[2][$z]."')";
      else
       $rep=$f[0][$z];
      if ($atob)
       $enc = str_replace($rep, "'".base64_decode($c[hexdec($f[2][$z])])."'", $enc);
      else
       $enc = str_replace($rep, "'".$c[hexdec($f[2][$z])]."'", $enc);
     }
    $enc=str_replace("'+'","",$enc); // concat string
  return true;
 } else {
  return false;
 }
}
function jsabc(&$enc) {
 // fix abc function
 $mod = '';
 $enc=decode_code($enc);
 if (preg_match("/decodeURIComponent/",$enc)) {
   $t1=explode('decodeURIComponent',$enc);
   $t2=explode('{',$t1[1]);
   $t3=explode(';',$t2[1]);
   $mod=$t3[0];
   $mod=str_replace("Math.","",$mod);
   $mod=preg_replace_callback(
    "/Math\[(.*?)\]/",
    function ($matches) {
     return preg_replace("/(\s|\"|\'|\+)/","",$matches[1]);;
    },
    $mod
   );
   preg_match_all("/[a-zA-Z0-9_]+/",$mod,$m);
   $mod=str_replace($m[0][0],"\$a54",$mod);
   $mod=str_replace($m[0][1],"\$a72",$mod);
   $mod=$mod.";";
 } else {
 $mod= "\$a54[\$a72] = \$a72;";
 }
 // end fix
 if (preg_match("/atob/",$enc))
  $atob="yes";
 else
  $atob="";
 if ($c0=get_array($enc)) {
  if (replace_func($c0,true,$enc,$mod)) { // if abc('0x0,'dfgt');
    if ($c1=get_array($enc)) {
     replace_func($c1,false,$enc,$mod);
     replace_func1($c1,false,$enc, $atob);
    }
  } elseif (replace_func1($c0,true,$enc, $atob)) {  // no abc function,try def('0x0')
    if ($c1=get_array($enc)) {
      replace_func1($c1,false,$enc, $atob);
    }
  }
 $enc=str_replace("'+'","",$enc); // concat string
 $enc=str_replace('"+"',"",$enc); // concat string
 return $enc;
 } else {
  return "";
 }
}
