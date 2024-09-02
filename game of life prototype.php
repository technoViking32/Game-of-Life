<?php

$a = [  ["L", "D", "D","D", "D", "L"], 
        ["L", "L", "D","D", "D", "L"],
        ["L", "L", "D","D", "D", "L"],
        ["L", "L", "D","D", "D", "L"], 
        ["D", "D", "L","D", "D", "L"]];

           var_dump($a);

        foreach( $a as $b ) {
            foreach ( $b as $test) {
                echo "$test";
            }
            echo PHP_EOL;
        }
        
?>