function validate() {

  if (document.forms[0].nome.value.length == 0) {
    alert('Por favor, preencha o campo Nome.');
    document.forms[0].nome.focus();
    return false;
  }
  
  if (document.forms[0].prefixo.value.length == 0 || document.forms[0].prefixo.value == 'DDD') {
    alert('Por favor, preencha o Prefixo do Telefone.');
    document.forms[0].prefixo.focus();
    return false;
  }
  
  if (document.forms[0].fone.value.length == 0) {
    alert('Por favor, preencha o campo Fone.');
    document.forms[0].fone.focus();
    return false;
  }
  
  if (document.forms[0].email.value.length == 0) {
    alert('Por favor, preencha o campo E-mail');
    document.forms[0].email.focus();
    return false;
  }
  
  if (!emailCheck(document.forms[0].email.value)) {
    return false;
  }

  if (document.forms[0].mensagem.value == 0) {
    alert('Por favor, preencha o campo mensagem');
    document.forms[0].mensagem.focus();
    return false;
  }
  
  return true;
  
}


function emailCheck (emailStr) {
  
  var checkTLD=1;
  var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
  var emailPat=/^(.+)@(.+)$/;
  var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
  var validChars="\[^\\s" + specialChars + "\]";
  var quotedUser="(\"[^\"]*\")";
  var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
  var atom=validChars + '+';
  var word="(" + atom + "|" + quotedUser + ")";
  var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
  var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
  var matchArray=emailStr.match(emailPat);
  var errorMsg = "O e-mail informado é inválido, por favor corrija-o e tente novamente";
  
  if (matchArray==null) {
    //alert("Email address seems incorrect (check @ and .'s)");
    alert(errorMsg);
    return false;
  }
  
  var user=matchArray[1];
  var domain=matchArray[2];
  
  for (i=0; i<user.length; i++) {
    if (user.charCodeAt(i)>127) {
      //alert("Ths username contains invalid characters.");
      alert(errorMsg);
      return false;
    }
  }

  for (i=0; i<domain.length; i++) {
    if (domain.charCodeAt(i)>127) {
      //alert("Ths domain name contains invalid characters.");
      alert(errorMsg);
      return false;
    }
  }
  
  // See if "user" is valid 
  if (user.match(userPat)==null) {
    //alert("The username doesn't seem to be valid.");
    alert(errorMsg);
    return false;
  }
  
  /* if the e-mail address is at an IP address (as opposed to a symbolic
  host name) make sure the IP address is valid. */
  
  var IPArray=domain.match(ipDomainPat);
  if (IPArray!=null) {
  
    // this is an IP address  
    for (var i=1;i<=4;i++) {
      if (IPArray[i]>255) {
        //alert("Destination IP address is invalid!");
        alert(errorMsg);
        return false;
      }
    }

    return true;
  }
  
  // Domain is symbolic name.  Check if it's valid.  
  var atomPat=new RegExp("^" + atom + "$");
  var domArr=domain.split(".");
  var len=domArr.length;
  for (i=0;i<len;i++) {
    if (domArr[i].search(atomPat)==-1) {
      //alert("The domain name does not seem to be valid.");
      alert(errorMsg);
      return false;
    }
  }
  
  if (checkTLD && domArr[domArr.length-1].length!=2 && 
    domArr[domArr.length-1].search(knownDomsPat)==-1) {
    //alert("The address must end in a well-known domain or two letter " + "country.");
    alert(errorMsg);
    return false;
  }
  
  // Make sure there's a host name preceding the domain.
  if (len<2) {
    //alert("This address is missing a hostname!");
    alert(errorMsg);
    return false;
  }
  
  // If we've gotten this far, everything's valid!
  return true;
  
}

function textCounter(field, countfield, maxlimit) {
  if (field.value.length > maxlimit) // if too long...trim it!
    field.value = field.value.substring(0, maxlimit);
    // otherwise, update 'characters left' counter
  else 
    document.all.chars.innerText = field.value.length;
    if (maxlimit - field.value.length < 20) {
      document.all.chars.setAttribute("class", "red"); 
    } else {
      document.all.chars.setAttribute("class", ""); 
    }
}

function qs() {
  var qsParm = new Array();
  var query = window.location.search.substring(1);
  var parms = query.split('&');
  for (var i=0; i<parms.length; i++) {
    var pos = parms[i].indexOf('=');
    if (pos > 0) {
      var key = parms[i].substring(0,pos);
      var val = parms[i].substring(pos+1);
      qsParm[key] = val;
    }
  }
  if (qsParm['msg'] == 'ok') {
    alert('Mensagem enviada com sucesso.\nNós entraremos em contato o mais breve possível.');
  }
}