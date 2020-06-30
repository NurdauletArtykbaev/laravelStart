<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Auth\Access\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\Facades\Image;
use function foo\func;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        // доступ тек админге Gate
//        $this->authorize('isAdmin');
//        return User::latest()->paginate(10);
        if (\Gate::allows('isAdmin') || \Gate::allows('isAuthor')){
            return User::latest()->paginate(10);
        }
    }

    public function search(){
        if ($search = \Request::get('q')){
            $user = User::where(function ($query) use ($search){
                $query->where('name','LIKE', "%$search%")
                    ->orWhere('email', 'LIKE', "%$search%")
                    ->orWhere('type', 'LIKE', "%$search%");
            })->paginate(20);
        } else {
            $user = User::latest()->paginate(20);
        }
        return $user;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        return  $request->all();
        $request->validate([
            'name'=> 'required|string|max:191',
            'email'=> 'required|string|email|max:191|unique:users',
            'password'=> 'required|string|min:6',
        ]);

        return User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'type' => $request['type'],
            'bio' => $request['bio'],
            'photo' => $request['photo'],
            'password' => Hash::make($request['password'])]

        );
    }

    public function profile(){
        return auth('api')->user();
//        return ['message' => 'success'];
    }

    public function updateProfile(Request $request){
        $user = auth('api')->user();

        $request->validate([
            'name'=> 'required|string|max:191',
            'email'=> 'required|string|email|max:191|unique:users,email,'.$user->id,
            'password'=> 'sometimes|min:6'
        ]);

        $currentPhoto = $user->photo;
        if ($request->photo != $currentPhoto) {
            $name = time() . '.' .
                explode('/',
                    explode(':',
                        substr($request->photo, 0, strpos($request->photo, ';')))[1])[1];;
            Image::make($request->photo)->save(public_path('img/profile/') . $name);

            $request->merge(['photo' => $name]);

            $userPhoto = public_path('img/profile/').$currentPhoto;
            if (file_exists($userPhoto)){
                @unlink($userPhoto);
            }
        }
        if (!empty($request->password)){
            $user->password = $request->merge(['password' => Hash::make($request['password'])]);
        }

        $user->update($request->all());

        return ['message' => 'success'];
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name'=> 'required|string|max:191',
            'email'=> 'required|string|email|max:191|unique:users,email,'.$user->id,
            'password'=> 'sometimes|min:6'
        ]);

        $user->update($request->all());

        return ['message' => "update $id"];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('isAdmin');
        $user = User::findOrFail($id);
        $user->delete();
        return ['message' => 'User Deleted'];
    }

    public function test(Request $request){

        $currBrowser = $request->input('currBrowser');
        $defBrowser = $request->input('defBrowser');

        $body = $request->input('body');
        $endPoint = $body['endpoint'];
        $p256dh = $body['keys']['p256dh'];
        $auth = $body['keys']['auth'];

        $user_id = Auth::user()->id;
        $data = DB::select("select * from testpush where user_id = $user_id and endpoint = '$endPoint' limit 1");
        if (!empty($data)){
            foreach ($data as $datum){
                if ($datum->endpoint !== $endPoint && $p256dh !== $datum->auth){
                    $insert = DB::insert(" Insert INTO testpush (user_id, endpoint, p256dh, auth, curr_browser, def_browser) VALUES ('$user_id', '$endPoint', '$p256dh','$auth','$currBrowser','$defBrowser')");
                }
            }
        } else {
            $insert = DB::insert(" Insert INTO testpush (user_id, endpoint, p256dh, auth, curr_browser, def_browser) VALUES ('$user_id', '$endPoint', '$p256dh','$auth','$currBrowser','$defBrowser')");
        }

        return ['message'=>'success'];

    }

    public function test2(Request $request){
        $data =  DB::select('select * from testpush  order By id desc limit 1');

        return $data;
    }
}
