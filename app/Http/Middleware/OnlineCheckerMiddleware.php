<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Auth;
use App\Models\User;
use Carbon\Carbon;

class OnlineCheckerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check()) {
            $data = User::findOrFail(Auth::user()->id);
            if($data){
                $current_time = time(); // Get the current timestamp
                $new_time = $current_time + 5 * 60; // Add 5 minutes (5 * 60 seconds)
                $new_datetime = date('Y-m-d H:i', $new_time); // Format the new timestamp
                // dd(Carbon::now()->format('Y-m-d H:i'),  $new_datetime);
                // $data->last_activity = Carbon::now()->format('Y-m-d H:i');
                $data->last_activity = $new_datetime;
                $data->save();
            }
        }
        return $next($request);
    }
}
