<?php
$services = [	"service-jitlada",
							"service-fancy",
							"service-shortnight",
							"service-longnight",
							"service-thai",
							"service-malesinger",
							"service-womensinger",
							"service-international",
							"service-firedrama",
							"service-king",
							"service-queen",
							"service-dancer",
							"service-animal",
							"service-backwoodsman",
							"service-santa",
							"service-leather",
							"service-childfancy",
							"service-halloween",
							"service-oldstyle",
							"service-retromen",
							"service-occupation",
							"service-hawaii",
							"service-superhero",
							"service-roman",
							"service-gasby",
							"service-bird",
							"service-mermaid",
							"service-cleo",
							"service-chinese",
							"service-cosplay",
							"service-jasmine",
							"service-elvis",
							"service-indian"];

while (list ($key, $val) = each ($services) ){
	$dir = "/service/".$val;
	$objOpen = opendir(".".$dir."/img/");
	$fp = fopen($_SERVER['DOCUMENT_ROOT'].$dir."/img.txt","wb");
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