<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Moodboard extends CI_Controller {

	public function index()
	{
		$this->load->model('moodboard_model');
		$data['result'] = $this->moodboard_model->getBoard();
		$data['title'] = "CI_TEST!";
		$this->load->view('moodboard');
	}
}