export const notEmpty = text => {
    if(text.length > 3) {
        return true;
    } else {
        return false;
    }
}

export const optionSelected = text => {
    if(text === '') {
        return false;
    } else {
        return true;
    }
}

export const isNumeric = num => {
    return !isNaN(parseInt(num));
}

export const numberInRange = (num, min, max) => {
    num = parseInt(num);
    return num >= min && num <= max;
}

export const validateRut = rut => {
    let valor = rut.replace('.','');
    valor = valor.replace('-','');
    let cuerpo = valor.slice(0,-1);
    let dv = valor.slice(-1).toUpperCase();

    if (cuerpo.length < 7) {
        return false;
    }

    let suma = 0;
    let multiplo = 2;

    for( let i = 1; i<=cuerpo.length; i++) {
        let index = multiplo * valor.charAt(cuerpo.length - i );

        suma = suma + index;
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }

    let dvEsperado = 11 - (suma % 11);
    const preDv = dv;
    dv = (dv === 'K')?10:dv;
    dv = (dv === 0)?11:dv;

    if(dvEsperado !== parseInt(dv)) { 
        return false; 
    }

    return {validation: true, formattedRut: cuerpo + '-' + preDv};
}

export const validateForm = form => {
    const validate = Object.values(form).reduce((result = 0, item) => {
        return result + (item ? 1 : 0);
    });

    return validate === Object.keys(form).length;
}