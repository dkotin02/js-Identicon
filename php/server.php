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
              $inthash = hexdec($hash); // convert to 32-bit integer
              //decide which bits gets turned on and which get left off
              //Fill grid with this information
              //Method 1:
             //for ($i=0; $i < $grid_size; $i++){
             //     for ($j=0; $j < $grid_size; $j++) {
             //         //if last bit is 1, set to 1
             //         if (($inthash & 1) == 1){
             //              $grid[$i][$j] = 1;
             //         }else{
             //             $grid[$i][$j] = 0;
             //         }
             //         $inthash >>= 1; //shift right
             //     }
             //}
    
             //Method 2:
             $max_steps = ($grid_size % 2 == 0)? ($grid_size * $grid_size)/2 : ($grid_size * ($grid_size+1))/2;
             $x = 0;
             $y = 0;
           
             for ($i=0; $i < $max_steps; $i++){
                      //if last bit is 1, set to 1
                      if (($inthash & 1) == 1){
                           $grid[$y][$x] = 1; //will be filled
                           $grid[$grid_size-$y-1][$x] = 1;//mirror
                      }else{
                          $grid[$y][$x] = 0;
                     }
                      $inthash >>= 1; //shift right
                      $x++;
    
                      if ($x == $grid_size){
                          $y++;
                          $x = 0;
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
