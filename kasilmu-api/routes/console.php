<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('tagihan:generate')->daily();
