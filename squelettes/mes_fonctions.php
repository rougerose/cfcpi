<?php

function conversion_charset ($texte) {
  // mb_convert_encoding ( $texte, "UTF-8");
  // mb_convert_encoding($text, "UTF-8", "ISO-8859-1");
  // $a = mb_detect_encoding ( $texte );
  // $texte = mb_substitute_character("long");
  // html_entity_decode ($texte);
  // mb_convert_encoding ( $texte, "ISO-8859-1");
  // $a = mb_detect_encoding ( $texte );
  // return $a;
  utf8_encode ($texte);
  $texte = mb_detect_encoding ( $texte );
  return $texte;
  
}

?>