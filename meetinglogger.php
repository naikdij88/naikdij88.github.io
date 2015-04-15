<?php
   /* original author: chris at linuxuser.at
      licence: GPLv2
      highly modified by Adelle Fitzgerald for use as a vw meeting logger
   */
   
/* Function to strip leading slashes from quotes */
function smartstripslashes($str) {
  $cd1 = substr_count($str, "\"");
  $cd2 = substr_count($str, "\\\"");
  $cs1 = substr_count($str, "'");
  $cs2 = substr_count($str, "\\'");
  $tmp = strtr($str, array("\\\"" => "", "\\'" => ""));
  $cb1 = substr_count($tmp, "\\");
  $cb2 = substr_count($tmp, "\\\\");
  if ($cd1 == $cd2 && $cs1 == $cs2 && $cb1 == 2 * $cb2) {
    return strtr($str, array("\\\"" => "\"", "\\'" => "'", "\\\\" => "\\"));
  }
  return $str;
}

   $fn = "chat.txt";
      
   /* spam keywords  - if keyword is detected it will drop entire line*/
   $spam[] = "nigger";
   $spam[] = "wanker";

   /* spam, if message IS exactly that string - will drop entire line*/   
   $espam[] = "ajax";
   
   
   $msg = $_POST['fmessage'];
   $n = $_POST['fname'];
   $tme = $_POST['ftime'];
   $key = $_POST['fkey'];
   $cmd = $_POST['fcmd'];
   
   if ($key != "1234") { die(); } /* Set this to the same key as the in-world LSL script */
   
   if ($cmd == "clear")  {
   $handle = fopen ($fn, 'w'); fwrite ($handle, ""); fclose($handle);
   }
   
   if ($msg != "")  {
      /* Check for spam keywords */
      $mystring = strtoupper($msg);
      foreach ($spam as $a) {   
          if (strpos($mystring, strtoupper($a)) === false) {
          } else { die(); }
      }   
      
      /* Check for spam message */
      foreach ($espam as $a) {
         if (strtoupper($msg) == strtoupper($a)) { die(); }      
      }
      
      /* Write the message to the text file */
      $out = $tme . "<b><i>" . $n . "</i></b> " . $msg . "<br>\n";
      $out = smartstripslashes($out);
      
      $handle = fopen ($fn, 'a'); fwrite ($handle, $out); fclose($handle);            
   }
?>