<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    //index
    public function index(){
        return view('welcome');
    }
}
