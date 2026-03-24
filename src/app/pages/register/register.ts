import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Button } from "../../shared/components/button";
import { form, FormField, minLength, required, validate } from "@angular/forms/signals";
import { FormErrors } from "../../shared/components/form-errors";
import { FormsModule } from "@angular/forms";

@Component({
    selector:'app-register',
    imports:[RouterLink,Button,FormField,FormErrors,FormsModule],
    template: `
  <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
      <h1 class="text-2xl font-bold text-center text-slate-900 mb-8">Register</h1>

      <form class="space-y-6" (ngSubmit)="onSubmit()">
        <div>
          <label for="username" class="block text-sm font-medium text-slate-700 mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            autocomplete="username"
            [formField] = "registerForm.username"

            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your username"
          />
        </div>
            <app-form-errors [control]="registerForm.username()"/>

        <div>
          <label for="email" class="block text-sm font-medium text-slate-700 mb-2"> Email </label>
          <input
            id="email"
            type="email"
            autocomplete="email"
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your email"
            [formField] = "registerForm.email"
          />
        </div>
        <app-form-errors [control]="registerForm.email()"/>

        <div>
          <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            autocomplete="current-password"
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your password"
            [formField] = "registerForm.password"
          />
        </div>
            <app-form-errors [control]="registerForm.password()"/>


        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-slate-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autocomplete="current-password"
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-shadow"
            placeholder="Enter your password"
            [formField] = "registerForm.confirmPassword"
          />
        </div>
        <app-form-errors [control] = "registerForm.confirmPassword()"/>

        <button appButton type="submit" [disabled]="registerForm().invalid()" class="w-full">
         Register
        </button>

        <p class="text-sm text-center text-slate-500 mt-4">
          Already have an account?
          <a routerLink="/login" class="text-slate-500 font-medium underline"> Login </a>
        </p>
      </form>
    </div>`,
    host:{
        class:'min-h-screen flex items-center justify-center bg-slate-100 p-4 '
    }
})



export class Register{
  registerModel = signal({
    username :'',
    email:'',
    password:'',
    confirmPassword:''

  })

  registerForm  = form(this.registerModel,(schemaPath)=>{
    required(schemaPath.username,{message:'Username is required'}),
    required(schemaPath.email,{message:'Email is required'}),
    required(schemaPath.password,{message:'Password is required '}),
    minLength(schemaPath.password,6,{message:'Password must be of 6 length'}),
    required(schemaPath.confirmPassword,{message:'Confirm passwors is required'}),

    validate(schemaPath.confirmPassword, ({value, valueOf}) => {
      const confirmPassword = value();
      const password = valueOf(schemaPath.password);
      if (confirmPassword !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }
      return null;
    });
  })

  onSubmit(){
    if(this.registerForm().valid()){
      console.log(this.registerForm().value())
    }
    else{
      console.log(" error ")
    }

  }
}
