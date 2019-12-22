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
		$source = preg_replace("/ /","",$source);
		preg_match("/eval\(function\(p,a,c,k,e,[r|d]?/", $source, $res);
		
		return (count($res) > 0);
	}
	
	function Unpack($source)
	{
		preg_match_all("/}\('(.*)', *(\d+), *(\d+), *'(.*?)'\.split\('\|'\)/",$source,$out);
		
		// Payload
		$this->payload = $out[1][0];
		// Words
		$this->symtab = preg_split("/\|/",$out[4][0]); 
		// Radix
		$this->radix = (int)$out[2][0];
		// Words Count
		$this->count = (int)$out[3][0];
		
		if( $this->count != count($this->symtab)) return; // Malformed p.a.c.k.e.r symtab !
		
		//ToDo: Try catch
		$this->unbaser = new Unbaser($this->radix);
		
		$result = preg_replace_callback(
					'/\b\w+\b/',
						array($this, 'Lookup')
					,
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
		preg_match_all("/var *(_\w+)\=\[\"(.*?)\"\];/",$source,$out);
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
		
		if($this->base > 62) $this->selector = 95;
		else if($this->base > 54) $this->selector = 62;
		else if($this->base > 52) $this->selector = 54;
	}
	
	function Unbase($val)
	{
		if( 2 <= $this->base && $this->base <= 36)
		{
			return intval($val,$this->base);
		}else{
			if(!isset($this->dict)){
				
				$this->dict = array_flip(str_split($this->ALPHABET[$this->selector]));
			}
			$ret = 0;
			$valArray = array_reverse(str_split($val));
			
			for($i = 0; $i < count($valArray) ; $i++)
			{
				$cipher = $valArray[$i];
				$ret += pow($this->base, $i) * $this->dict[$cipher];
			}
			return $ret;
			// UnbaseExtended($x, $base)
		}
	}
	
}

/*
Testing upacker
$packedJs = <<<HEREDOC
 eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('4 f=8;4 j=18;4 h=19;4 e=0;4 g=-1;4 1a=10;4 f=J;4 c=i(\'c\');c.15({14:[{"Y":"Z","x":"12/n","l":"6://u.a.b/s/13/p/m/r/X/0/1-1c-3-17-1j-q-1k 1l-q.n"}],1i:{1h:"1d",1e:[{1f:"6://d.a.b/1g.1m",x:"N",O:"5",}]},M:"v%",K:"16:9",W:"U",T:{l:"6://d.a.b/c.Q",P:"6://d.a.b",L:"8",V:"R-S"},1b:"o",1u:"1N",1O:"J",1P:8,1M:"1L",1I:"6://u.a.b/s/m/r.1J?1K=1R-1n&1W=p",1S:{1T:\'#1U\',1V:11,1Q:"1G",1t:0,1H:\'o\',1v:1s},1r:[],1o:{}});j=1p(t,(h*1q));1w t(){7(f==8){1x(j);1D 8}7(i("c").1E()==\'1F\'){e=e+h}7(g==-1){g=i("c").1C()}I{2=0;7(e>0){2=(k(e)/k(g))*v}7(1B.1y===1z){7(2>=5){f=8;$.H({F:"z",y:"6://d.a.b/G/",w:{A:"B",1A:"1",E:"",D:"C",2:2}})}}I{7(2>=5){f=8;$.H({F:"z",y:"6://d.a.b/G/",w:{A:"B",E:"",D:"C",2:2}})}}}}',62,121,'||percent||var||https|if|false||videomega|co|player|www|totalPlayedTime|trackJWTime|mediaTotalDuration|timerPeriod|jwplayer|jwTimer|parseInt|file|5dc19d54d7410|mp4|uniform|1573230691|Rip|8d1674fc20174779c71799ef7685734f|files|trackJWPlayedTime|go7|100|data|type|url|POST|fileId|2928|4d29fd5dd69432c90c59209445f33bd1|tracker|reffer|method|deep|ajax|else|true|aspectratio|hide|width|nonlinear|offset|link|png|control|bar|logo|start|position|startparam|099a4b2966f64c46|label|HD|||video|ObJk8SFCcDFCovkmmp7qxg|sources|setup|||null|60|ackPercentage|stretching|1416|vast|schedule|tag|match|client|advertising|Castellano|Sin|subtitulos|xml|fClgKFOp4ev9g|cast|setInterval|1000|tracks|95|backgroundOpacity|primary|fontOpacity|function|clearInterval|canRunAds|undefined|adblock|window|getDuration|return|getState|playing|Verdana|edgeStyle|image|jpg|md5|none|preload|html5|playbackRateControls|autostart|fontFamily|a0QdBKR4|captions|color|ffffff|fontSize|expires'.split('|'),0,{}))
HEREDOC;
$unpacker = new JavaScriptUnpacker($packedJs);
$unpacked = $unpacker->Unpack($packedJs);
echo $unpacked;*/

// nodejs call this function 
// to unpack videomega, mixdrop and mp4upload source
// you can make your own js unpacker
// if you don't need use PHP
function nodeunpack($str){
	$unpacker = new JavaScriptUnpacker($str);
	$unpacked = $unpacker->Unpack($str);
	return $unpacked;
}
