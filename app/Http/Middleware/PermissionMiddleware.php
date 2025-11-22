<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class PermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$data)
    {
        // dd('Permission Middleware', $data);
        if($data){
            $autherity = ['administrator','admin'];
            $finalPermits = array_merge($autherity, $data);
            // dd($finalPermits);
            if(Auth::user()->hasAnyRoles($finalPermits)){
                return $next($request);
            }else{
                $response =[
                    "message"=> "CPBIT Unauthorized Request. You don't have permission to enter. Please contact with
                    IT-Admin.",
                    "code"   => 503
                ];
                // return response()->json($response, 503);
                return response()->view("errors.permission", compact('response'));
            }
        }else{
           return response()->json(["message"=> "CPBIT Unauthorized Request. Role permission issue"], 503);
        }
    }
}
