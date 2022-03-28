export default (to, from, next) => {

    if (to.meta.authenticated && sessionStorage.getItem('tokens')) 
    {
        
        return next();
  }

     if (!to.meta.authenticated) 
     {
        return next();
    }
     
     next('/login');

};