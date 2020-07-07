import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action.js';

export default function(SpecificComponent,option,adminRoute = null){
    //SpecificComponent -> App.js에서 감쌀 페이지를말한다
    //option -> null(아무나출입이가능한페이지) , true(로그인한유저만 출입이가능한페이지), 
    //false(로그인한 유저는 출입이 불가능한 페이지)
    //adminRoute -> true(어드민만 출입이 가능) null(모두 출입이가능)기본값
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect( () => {
            dispatch(auth()).then(response => {
                console.log(response);
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login');
                    }
                } else {
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){ 
                        //어드민만 출입이가능 하지만 어드민이 아닐때 
                        props.history.push('/');
                    }else{
                        if(option ===false)
                        props.history.push('/');
                    }
                }
            })
           
        }, [])
        return (
            <SpecificComponent {...props}/>
        )
    }

    return AuthenticationCheck;
}