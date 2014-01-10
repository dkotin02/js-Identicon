<?php
    //This is a server...
    //RESTful API which takes a hash value as input and retuns a png image as a response
    //
    
    $result = "";
    function make_identicon($hash){
        //$hash is a 128-bit hash of the input 
        $result = $_GET["hash"];
        exit("hi");
    }
    
    
    if (isset($_GET["hash"])){
               make_identicon($_GET["hash"]);
        }
    }
    
?>
