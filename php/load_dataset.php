<?php

/**
 * dataset.php: directs form POST data, specifically 'svm_dataset[]' to respective
 *              python scripts.
 *
 * @file_temp: is a temporary reference to the 'uploaded file'.  This reference exists
 *   only for the duration of the current script, then it is automatically removed.
 */

// helper functions
  include(dirname(__FILE__) . '/helper.php');

// debug: return 'file upload(s)' to AJAX
  //var_dump($_FILES);

// local variables
  $arr_upload = Array();

// add uploaded file properties to 'arr_upload'
  $index = 0;
  foreach ($_FILES as $val) {
    $arr_upload['file_upload'][] = array(
      'file_name_' . $index => $val['name'],
      'file_temp_' . $index => $val['tmp_name'],
    );
    $index++;
  }
  $arr_upload['upload_quantity'] = count($_FILES);
  unset($index);

// JSON encode 'arr_upload'
  $json = json_encode( $arr_upload );

// send 'file upload' to python
  $result = shell_command('python ../python/svm_training.py', $json);

/**
 *  Python returns JSON object: the double nesting adheres to syntax
 *      similar to 'load_logic.php'.
 */
  if ( count((array)$result > 0) ) {
    remove_quote( $result );
    $obj_result = new Obj_Data($result, true);

    $arr_result = array('result' => $obj_result);
    $arr_result = array('data' => $arr_result);
    $arr_result['json_creator'] = basename(__FILE__);
    print json_encode($arr_result);
  }
?>
