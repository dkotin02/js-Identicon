<?php
          //This is a server...
          //RESTful API which takes a hash value as input and retuns a png image as a response
    
    
          $result = "An error occured :(";
          function make_identicon($hash)
          {
              //$hash is a truncated 32-bit hash of the input 
              $result = $hash;
              //Define variables
              $grid_size = 5;
              $square_size = 50;
    
              //make int nxn grid
              $grid = array();
              for ($i = 0; $i < $grid_size; $i++){
                  $grid[] = array();
                  for ($j = 0; $j < $grid_size; $j++){ 
                   $grid[$i][] = 0;
                  }
              }
    
              //Connvert hash to integer
              $inthash = intval($hash, 16); // convert to 32-bit integer
              //decide which bits gets turned on and which get left off
              //Fill grid with this information
             for ($i=0; $i < $grid_size; $i++){
                  for ($j=0; $j < $grid_size; $j++) {
                      //if last bit is 1, set to 1
                      if (($inthash & 1) == 1){
                           $grid_size[$i][$j] = 1;
                      }else{
                          $grid_size[$i][$j] = 0;
                      }
                      $inthash >>= 1; //shift right
                  }
             }
               $result = array('grid'=> $grid);
              //Send encoded version to client as JSON object
              exit(json_encode($result));
          }
    
    
    if (isset($_GET["method"]) && isset($_GET["hash"]))
          {
              if ($_GET["method"] == "identicon")
             // $result = $_GET["hash"];
              make_identicon($_GET["hash"]);
          }
        //  echo "ho";
        exit($result);
?>
