<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Moodboard extends CI_Controller {

	public function index()
	{
		
		// Load in URL Helper to dynamically load in CSS/JS
		$this->load->helper('url');
		$data['base_url'] = base_url();
		
		// Render the home moodboard view 
		$this->load->view('moodboard_home', $data);
	}
}