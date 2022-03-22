export default (to, from, next) => {

    if (to.meta.authenticated && sessionStorage.getItem('token')) 
    {
        
        return next();
  }

     if (!to.meta.authenticated) 
     {
        return next();
    }
     
     next('/login');

};