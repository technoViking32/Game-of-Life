<?php

$grid = [
    ["1", "1", "0", "0", "0", "1"],
    ["1", "1", "0", "0", "1", "1"],
    ["1", "1", "0", "0", "0", "0"],
    ["1", "1", "0", "0", "0", "1"]
];

function nextgen($grid)
{

    $newgrid = [];

    foreach ($grid as $y => $row) {
        foreach ($row as $x => $cell) {
            $levendeburen = 0;

            // hier onder worden de levende buren op getelt

            for ($dy = -1; $dy <= 1; $dy++) {
                for ($dx = -1; $dx <= 1; $dx++) {
                    if ($dx == 0 && $dy == 0) continue;
                    $nx = $x + $dx;
                    $ny = $y + $dy;
                    if (isset($grid[$ny][$nx])) {
                        $levendeburen += $grid[$ny][$nx];
                    } // $dy & $dx voor het navigeren in de grid. 
                } // $ny & $nx bepalen de coordinaten van de levende buren die worden gecheckt.
            }
            // Basis regels worden onderstaand toe gepast 

            if ($cell == 1 && ($levendeburen < 2 || $levendeburen > 3)) {
                $newgrid[$y][$x] = 0; //Dode cell
            } elseif ($cell == 0 && $levendeburen == 3) {
                $newgrid[$y][$x] = 1; //Nieuwe cell
            } else {
                $newgrid[$y][$x] = $cell; // Geen verandering
            }
        }
    }
    return $newgrid;
}
