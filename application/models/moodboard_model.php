<?php
class Moodboard_model extends Model {
	function Moodboard_model ()
	{
		//Moodboard Constructor
		parent::Model();
	}
	function getData() 
	{
		$query = $this->db->get('MB_Users');
		if( $query->num_rows() > 0 )
		{
			//There is no entry...
			// ...that unfortunately is what she said.
		} else {
			return $query->result(); 
		}
	}
}
?>