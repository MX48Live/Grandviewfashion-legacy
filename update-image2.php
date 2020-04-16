<?php
$services = ["service-anima2"];

while (list ($key, $val) = each ($services) ){
	$dir = "/service/".$val;
	$objOpen = opendir(".".$dir."/img/");
	$fp = fopen($_SERVER['DOCUMENT_ROOT'].$dir."/img_2.txt","wb");
	while (($file = readdir($objOpen)) !== false){
	  if(($file !==".") && ($file !=="..") && ($file !==".DS_Store")){
	    $arr_file[] = $file;  
	    $dimension = "";
	    $myIMG = "./service/".$val."/img/".$file;
	    $myIMGSize = getimagesize($myIMG);

	    if($myIMGSize[0] > $myIMGSize[1]){
	    	$dimension = ":landscape";
	    } else {
	    	$dimension = ":portrait";
	    }
	    fwrite($fp,$file.$dimension.",");
	    
	    // echo $file." in ".$val." : Widht : ".$myIMGSize[0].": Height : ".$myIMGSize[1]."<br>";
	  }
	}
	
	fclose($fp);

}
echo "Done!";
?>