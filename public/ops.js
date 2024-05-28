function set8bitAddFlags(a, b) {
    let tempResult = a + b;
    let tempResult2 = (a & 127) + (b & 127);  

    if (tempResult >= 128) setFlag("P/V", 1);
    else setFlag("P/V", 0);

    setFlag("N", 0);

    if (tempResult == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (tempResult >= 128) setFlag("S", 1);
    else setFlag("S", 0);
  
    if (tempResult2 >= 128) setFlag("C", 1);
    else setFlag("C", 0);
}

function set8bitSubFlags(a, b) {
    let tempResult = a - b;

    if (tempResult < -128) setFlag("P/V", 1);
    else setFlag("P/V", 0);

    setFlag("N", 1);

    if (tempResult == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (tempResult < 0) setFlag("S", 1);
    else setFlag("S", 0);
  
    if (a < b) setFlag("C", 1);
    else setFlag("C", 0);
}

function a_add_r() {
    const valToAdd = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 1;
}

function a_add_at_hl() {
    const valToAdd = memory[(H[0] << 8) + L[0]];

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 1;
}

function a_add_at_ix() {
    const valToAdd = memory[IX[0] + memory[PC[0] + 2]];

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 3;
}

function a_add_at_iy() {
    const valToAdd = memory[IY[0] + memory[PC[0] + 2]];

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 3;
}

function a_add_v() {
    const valToAdd = memory[PC[0] + 1];

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 2;
}

function hl_add_r() {
    const regToAdd = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4);

    let valToAdd = 0;
    if (regToAdd == "SP") valToAdd = SP[0];
    else valToAdd = eval(`(${regToAdd[0]}[0] << 8) + ${regToAdd[1]}[0]`);

    setFlag("N", 0);

    let tempResult = (((H[0] << 8) + L[0]) & 32767) + (valToAdd & 32767);

    if (tempResult >= 32767) setFlag("C", 1);
    else setFlag("C", 0);

    H[0] += (valToAdd & parseInt("1111111100000000", 2)) >> 8;
    L[0] += (valToAdd & parseInt("11111111", 2));
    PC[0] += 1;
}

function ix_add_r() {
    const regToAdd = getRegFromT4Code((memory[PC[0] + 1] & parseInt("00110000", 2)) >> 4);

    let valToAdd = 0;
    if (regToAdd == "SP") valToAdd = SP[0];
    else if (regToAdd == "IX") valToAdd = IX[0];
    else valToAdd = eval(`(${regToAdd[0]}[0] << 8) + ${regToAdd[1]}[0]`);

    setFlag("N", 0);

    let tempResult = (IX[0] & 32767) + (valToAdd & 32767);

    if (tempResult >= 32767) setFlag("C", 1);
    else setFlag("C", 0);

    IX[0] += valToAdd;
    PC[0] += 2;
}

function iy_add_r() {
    const regToAdd = getRegFromT5Code((memory[PC[0] + 1] & parseInt("00110000", 2)) >> 4);

    let valToAdd = 0;
    if (regToAdd == "SP") valToAdd = SP[0];
    else if (regToAdd == "IY") valToAdd = IY[0];
    else valToAdd = eval(`(${regToAdd[0]}[0] << 8) + ${regToAdd[1]}[0]`);

    setFlag("N", 0);

    let tempResult = (IY[0] & 32767) + (valToAdd & 32767);

    if (tempResult >= 32767) setFlag("C", 1);
    else setFlag("C", 0);

    IY[0] += valToAdd;
    PC[0] += 2;
}

function a_adc_r() {
    const valToAdd = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`) + getFlag("C");

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 1;
}

function a_adc_at_hl() {
    const valToAdd = memory[(H[0] << 8) + L[0]] + getFlag("C");

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 1;
}

function a_adc_at_ix() {
    const valToAdd = memory[IX[0] + memory[PC[0] + 2]] + getFlag("C");

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 3;
}

function a_adc_at_iy() {
    const valToAdd = memory[IY[0] + memory[PC[0] + 2]] + getFlag("C");

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 3;
}

function a_adc_v() {
    const valToAdd = memory[PC[0] + 1] + getFlag("C");

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 2;
}

function hl_adc_r() {
    const regToAdd = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4);

    let valToAdd = 0;
    if (regToAdd == "SP") valToAdd = SP[0] + getFlag("C");
    else valToAdd = eval(`(${regToAdd[0]}[0] << 8) + ${regToAdd[1]}[0]`) + getFlag("C");

    let tempResult = (((H[0] << 8) + L[0]) & 32767) + (valToAdd & 32767);

    if (tempResult >= 32767) setFlag("C", 1);
    else setFlag("C", 0);

    let tempResult2 = (H[0] << 8) + L[0] + valToAdd;

    if (tempResult2 >= 128) setFlag("P/V", 1);
    else setFlag("P/V", 0);

    setFlag("N", 0);

    if (tempResult2 == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (tempResult2 >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    H[0] += (valToAdd & parseInt("1111111100000000", 2)) >> 8;
    L[0] += (valToAdd & parseInt("11111111", 2));
    PC[0] += 2;
}

function a_sub_r() {
    const valToSub = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 1;
}

function a_sub_at_hl() {
    const valToSub = memory[(H[0] << 8) + L[0]];

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 1;
}

function a_sub_at_ix() {
    const valToSub = memory[IX[0] + memory[PC[0] + 2]];

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 3;
}

function a_sub_at_iy() {
    const valToSub = memory[IY[0] + memory[PC[0] + 2]];

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 3;
}

function a_sub_v() {
    const valToSub = memory[PC[0] + 1];

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 2;
}

function a_sbc_r() {
    const valToSub = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`) + getFlag("C");

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 1;
}

function a_sbc_at_hl() {
    const valToSub = memory[(H[0] << 8) + L[0]] + getFlag("C");

    set8bitSubFlags(A[0], valToSub);
   
    A[0] -= valToSub;
    PC[0] += 1;
}

function a_sbc_at_ix() {
    const valToSub = memory[IX[0] + memory[PC[0] + 2]] + getFlag("C");

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 3;
}

function a_sbc_at_iy() {
    const valToSub = memory[IY[0] + memory[PC[0] + 2]] + getFlag("C");

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 3;
}

function a_sbc_v() {
    const valToSub = memory[PC[0] + 1] + getFlag("C");

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 2;
}

function hl_sbc_r() {
    const regToSub = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4);

    let valToSub = 0;
    if (regToSub == "SP") valToSub = SP[0] + getFlag("C");
    else valToSub = eval(`(${regToAdd[0]}[0] << 8) + ${regToAdd[1]}[0]`) + getFlag("C");

    let tempResult = ((H[0] << 8) + L[0]) - valToSub;

    if (tempResult < -32768) setFlag("P/V", 1);
    else setFlag("P/V", 0);

    setFlag("N", 1);

    if (tempResult == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (tempResult < 0) setFlag("S", 1);
    else setFlag("S", 0);
  
    if (((H[0] << 8) + L[0]) < valToSub) setFlag("C", 1);
    else setFlag("C", 0);

    H[0] += (valToAdd & parseInt("1111111100000000", 2)) >> 8;
    L[0] += (valToAdd & parseInt("11111111", 2));
    PC[0] += 2;
}

function inc_r() {
    const regToInc = getRegFromT1Code((memory[PC[0]] & parseInt("00111000", 2)) >> 3); 
    const regToIncVal = eval(`${regToInc}[0]`);

    set8bitAddFlags(regToIncVal, 1);

    eval(`${regToInc}[0] += 1`);
    PC[0] += 1;
}

function inc_at_hl() {
    const valAtHl = memory[(H[0] << 8) + L[0]];
    set8bitAddFlags(valAtHl, 1);

    memory[(H[0] << 8) + L[0]] += 1;
    PC[0] += 1;
}

function inc_at_ix() {
    const valAtIX = memory[IX[0] + memory[PC[0] + 2]];
    set8bitAddFlags(valAtIX, 1);

    memory[IX[0] + memory[PC[0] + 2]] += 1;
    PC[0] += 3;
}

function inc_at_iy() {
    const valAtIY = memory[IY[0] + memory[PC[0] + 2]];
    set8bitAddFlags(valAtIY, 1);

    memory[IY[0] + memory[PC[0] + 2]] += 1;
    PC[0] += 3;
}

function inc_R() {
    const regToInc = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4); 

    if (regToInc == "SP") SP[0] += 1;
    else {
        let temp = eval(`(${regToInc[0]}[0] << 8) + ${regToInc[1]}[0]`) + 1;
        eval(`${regToInc[0]}[0] = temp & parseInt("1111111100000000", 2)`);
        eval(`${regToInc[1]}[0] = temp & parseInt("11111111", 2)`);
    }
    PC[0] += 1;
}

function inc_ix() {
    IX[0] += 1;
    PC[0] += 2;
}

function inc_iy() {
    IY[0] += 1;
    PC[0] += 2;
}

function dec_r() {
    const regToDec = getRegFromT1Code((memory[PC[0]] & parseInt("00111000", 2)) >> 3); 
    const regToDecVal = eval(`${regToDec}[0]`);

    set8bitSubFlags(regToDecVal, 1);

    eval(`${regToDec}[0] -= 1`);
    PC[0] += 1;
}

function dec_at_hl() {
    const valAtHl = memory[(H[0] << 8) + L[0]];
    set8bitSubFlags(valAtHl, 1);

    memory[(H[0] << 8) + L[0]] -= 1;
    PC[0] += 1;
}

function dec_at_ix() {
    const valAtIX = memory[IX[0] + memory[PC[0] + 2]];
    set8bitSubFlags(valAtIX, 1);

    memory[IX[0] + memory[PC[0] + 2]] -= 1;
    PC[0] += 3;
}

function dec_at_iy() {
    const valAtIY = memory[IY[0] + memory[PC[0] + 2]];
    set8bitSubFlags(valAtIY, 1);

    memory[IY[0] + memory[PC[0] + 2]] -= 1;
    PC[0] += 3;
}

function dec_R() {
    const regToDec = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4); 

    if (regToDec == "SP") SP[0] -= 1;
    else {
        let temp = eval(`(${regToDec[0]}[0] << 8) + ${regToDec[1]}[0]`) - 1;
        eval(`${regToDec[0]}[0] = temp & parseInt("1111111100000000", 2)`);
        eval(`${regToDec[1]}[0] = temp & parseInt("11111111", 2)`);
    }
    PC[0] += 1;
}

function dec_ix() {
    IX[0] -= 1;
    PC[0] += 2;
}

function dec_iy() {
    IY[0] -= 1;
    PC[0] += 2;
}

function neg() {
    set8bitSubFlags(0, A[0]);
    A[0] = -A[0];

    PC[0] += 2;
}

function mlt() {
    const regToMlt = getRegFromT3Code((memory[PC[0] + 1] & parseInt("00110000", 2)) >> 4); 

    if (regToMlt == "SP") SP[0] = (SP[0] & parseInt("1111111100000000", 2)) * (SP[0] & parseInt("11111111", 2));
    else eval(`${regToMlt[1]}[0] = ${regToMlt[0]}[0] * ${regToMlt[1]}[0]`);

    PC[0] += 2;
}

function cpl() {
    setFlag("H", 1);
    setFlag("N", 1);

    A[0] = A[0] ^ 255;

    PC[0] += 1;
}

function setAndFlags(a, b) {
    let temp = a & b;

    setFlag("H", 1);
    setFlag("N", 0);
    setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P/V", temp & 1);
}

function setOrFlags(a, b) {
    let temp = a | b;

    setFlag("H", 0);
    setFlag("N", 0);
    setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P/V", temp & 1);
}

function setXorFlags(a, b) {
    let temp = a ^ b;

    setFlag("H", 0);
    setFlag("N", 0);
    setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P/V", temp & 1);
}

function a_and_r() {
    const valToAnd = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    setAndFlags(A[0], valToAnd);

    A[0] &= valToAnd;
    PC[0] += 1;
}

function a_and_at_hl() {
    const valToAnd = memory[(H[0] << 8) + L[0]];

    setAndFlags(A[0], valToAnd);

    A[0] &= valToAnd;
    PC[0] += 1;
}

function a_and_at_ix() {
    const valToAnd = memory[IX[0] + memory[PC[0] + 2]];

    setAndFlags(A[0], valToAnd);

    A[0] &= valToAnd;
    PC[0] += 3;
}

function a_and_at_iy() {
    const valToAnd = memory[IY[0] + memory[PC[0] + 2]];

    setAndFlags(A[0], valToAnd);

    A[0] &= valToAnd;
    PC[0] += 3;
}

function a_and_v() {
    const valToAnd = memory[PC[0] + 1];

    setAndFlags(A[0], valToAnd);

    A[0] &= valToAnd;
    PC[0] += 2;
}

function a_or_r() {
    const valToOr = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    setOrFlags(A[0], valToOr);

    A[0] |= valToOr;
    PC[0] += 1;
}

function a_or_at_hl() {
    const valToOr = memory[(H[0] << 8) + L[0]];

    setOrFlags(A[0], valToOr);

    A[0] |= valToOr;
    PC[0] += 1;
}

function a_or_at_ix() {
    const valToOr = memory[IX[0] + memory[PC[0] + 2]];

    setOrFlags(A[0], valToOr);

    A[0] |= valToOr;
    PC[0] += 3;
}

function a_or_at_iy() {
    const valToOr = memory[IY[0] + memory[PC[0] + 2]];

    setOrFlags(A[0], valToOr);

    A[0] |= valToOr;
    PC[0] += 3;
}

function a_or_v() {
    const valToOr = memory[PC[0] + 1];

    setOrFlags(A[0], valToOr);

    A[0] |= valToOr;
    PC[0] += 2;
}

function a_xor_r() {
    const valToXor = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    setXorFlags(A[0], valToXor);

    A[0] ^= valToXor;
    PC[0] += 1;
}

function a_xor_at_hl() {
    const valToXor = memory[(H[0] << 8) + L[0]];

    setXorFlags(A[0], valToXor);

    A[0] ^= valToXor;
    PC[0] += 1;
}

function a_xor_at_ix() {
    const valToXor = memory[IX[0] + memory[PC[0] + 2]];

    setXorFlags(A[0], valToXor);

    A[0] ^= valToXor;
    PC[0] += 3;
}

function a_xor_at_iy() {
    const valToXor = memory[IY[0] + memory[PC[0] + 2]];

    setXorFlags(A[0], valToXor);

    A[0] ^= valToXor;
    PC[0] += 3;
}

function a_xor_v() {
    const valToXor = memory[PC[0] + 1];

    setXorFlags(A[0], valToXor);

    A[0] ^= valToXor;
    PC[0] += 2;
}


function setSlaFlags(a) {
    let temp = a << 1;

    setFlag("H", 0);
    setFlag("N", 0);

    if (a >= 128) setFlag("C", 1);
    else setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P", 0);
}

function sla_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    setSlaFlags(eval(`${regToShift}[0]`));

    eval(`${regToShift}[0] = ${regToShift}[0] << 1`);
    PC[0] += 2;
}

function sla_at_hl() {
    setSlaFlags(memory[(H[0] << 8) + L[0]]);

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] << 1;
    PC[0] += 2;
}

function sla_at_ix() {
    setSlaFlags(memory[IX[0] + memory[PC[0] + 2]]);

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] << 1;
    PC[0] += 4;
}

function sla_at_iy() {
    setSlaFlags(memory[IY[0] + memory[PC[0] + 2]]);

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] << 1;
    PC[0] += 4;
}

function setSraFlags(a) {
    let temp = a & 1 + a >> 1;

    setFlag("H", 0);
    setFlag("N", 0);

    if ((a & 1) == 128) setFlag("C", 1);
    else setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P", 0);
}

function sra_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    setSraFlags(eval(`${regToShift}[0]`));

    eval(`${regToShift}[0] = ${regToShift}[0] & 1 + ${regToShift}[0] >> 1`);
    PC[0] += 2;
}

function sra_at_hl() {
    setSraFlags(memory[(H[0] << 8) + L[0]]);

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] & 1 + memory[(H[0] << 8) + L[0]] >> 1;
    PC[0] += 2;
}

function sra_at_ix() {
    setSraFlags(memory[IX[0] + memory[PC[0] + 2]]);

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] & 1 + memory[IX[0] + memory[PC[0] + 2]] >> 1;
    PC[0] += 4;
}

function sra_at_iy() {
    setSraFlags(memory[IY[0] + memory[PC[0] + 2]]);

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] & 1 + memory[IY[0] + memory[PC[0] + 2]] >> 1;
    PC[0] += 4;
}

function setSrlFlags(a) {
    let temp = a >> 1;

    setFlag("H", 0);
    setFlag("N", 0);

    if ((a & 1) == 1) setFlag("C", 1);
    else setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P", 0);
}

function srl_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    setSrlFlags(eval(`${regToShift}[0]`));

    eval(`${regToShift}[0] = ${regToShift}[0] >> 1`);
    PC[0] += 2;
}

function srl_at_hl() {
    setSrlFlags(memory[(H[0] << 8) + L[0]]);

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] >> 1;
    PC[0] += 2;
}

function srl_at_ix() {
    setSrlFlags(memory[IX[0] + memory[PC[0] + 2]]);

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] >> 1;
    PC[0] += 4;
}

function srl_at_iy() {
    setSrlFlags(memory[IY[0] + memory[PC[0] + 2]]);

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] >> 1;
    PC[0] += 4;
}

function setRlFlags(a) {
    setFlag("P/V", getFlag("C"));
    const temp = a << 1 + getFlag("C");

    setFlag("C", (a & 128) >> 8);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    setFlag("H", 0);
    setFlag("N", 0);
}

function rla() {
    A[0] = A[0] << 1 + getFlag("C");

    setFlag("P/V", getFlag("C"));

    setFlag("C", (A[0] & 128) >> 8);

    setFlag("H", 0);
    setFlag("N", 0);

    PC[0] += 1;
}

function rl_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    eval(`${regToShift}[0] = ${regToShift}[0] << 1 + getFlag("C")`);

    setRlFlags(eval(`${regToShift}[0]`));

    PC[0] += 2;
}

function rl_at_hl() {
    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] << 1 + getFlag("C");

    setRlFlags(memory[(H[0] << 8) + L[0]]);

    PC[0] += 2;
}

function rl_at_ix() {
    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] << 1 + getFlag("C");

    setRlFlags(memory[IX[0] + memory[PC[0] + 2]]);

    PC[0] += 4;
}

function rl_at_iy() {
    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] << 1 + getFlag("C");

    setRlFlags(memory[IY[0] + memory[PC[0] + 2]]);

    PC[0] += 4;
}

function setRlcFlags(a) {
    setFlag("C", (a & 128) >> 8);
    setFlag("P/V", getFlag("C"));

    const temp = a << 1 + getFlag("C");

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    setFlag("H", 0);
    setFlag("N", 0);
}

function rlca() {
    setFlag("C", (A[0] & 128) >> 8);
    setFlag("P/V", getFlag("C"));

    A[0] = A[0] << 1 + getFlag("C");

    setFlag("H", 0);
    setFlag("N", 0);

    PC[0] += 1;
}

function rlc_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    setRlcFlags(eval(`${regToShift}[0]`));

    eval(`${regToShift}[0] = ${regToShift}[0] << 1 + getFlag("C")`);
    PC[0] += 2;
}

function rlc_at_hl() {
    setRlcFlags(memory[(H[0] << 8) + L[0]]);

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] << 1 + getFlag("C");
    PC[0] += 2;
}

function rlc_at_ix() {
    setRlcFlags(memory[IX[0] + memory[PC[0] + 2]]);

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] << 1 + getFlag("C");
    PC[0] += 4;
}

function rlc_at_iy() {
    setRlcFlags(memory[IY[0] + memory[PC[0] + 2]]);

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] << 1 + getFlag("C");
    PC[0] += 4;
}

function setRrFlags(a) {
    setFlag("P/V", getFlag("C"));
    const temp = a >> 1 + (getFlag("C") << 8);

    setFlag("C", a & 1);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    setFlag("H", 0);
    setFlag("N", 0);
}

function rra() {
    A[0] = A[0] >> 1 + (getFlag("C") << 8);

    setFlag("P/V", getFlag("C"));

    setFlag("C", A[0] & 1);

    setFlag("H", 0);
    setFlag("N", 0);

    PC[0] += 1;
}

function rr_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    eval(`${regToShift}[0] = ${regToShift}[0] >> 1 + (getFlag("C") << 8)`);

    setRrFlags(eval(`${regToShift}[0]`));

    PC[0] += 2;
}

function rl_at_hl() {
    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] >> 1 + (getFlag("C") << 8);

    setRrFlags(memory[(H[0] << 8) + L[0]]);

    PC[0] += 2;
}

function rl_at_ix() {
    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] >> 1 + (getFlag("C") << 8);

    setRrFlags(memory[IX[0] + memory[PC[0] + 2]]);

    PC[0] += 4;
}

function rl_at_iy() {
    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] >> 1 + (getFlag("C") << 8);

    setRrFlags(memory[IY[0] + memory[PC[0] + 2]]);

    PC[0] += 4;
}

function setRrcFlags(a) {
    setFlag("C", a & 1);
    setFlag("P/V", getFlag("C"));

    const temp = a >> 1 + (getFlag("C") << 8);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    setFlag("H", 0);
    setFlag("N", 0);
}

function rlca() {
    setFlag("C", A[0] & 1);
    setFlag("P/V", getFlag("C"));

    A[0] = A[0] >> 1 + (getFlag("C") << 8);

    setFlag("H", 0);
    setFlag("N", 0);

    PC[0] += 1;
}

function rrc_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    setRrcFlags(eval(`${regToShift}[0]`));

    eval(`${regToShift}[0] = ${regToShift}[0] >> 1 + (getFlag("C") << 8)`);
    PC[0] += 2;
}

function rrc_at_hl() {
    setRrcFlags(memory[(H[0] << 8) + L[0]]);

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] >> 1 + (getFlag("C") << 8);
    PC[0] += 2;
}

function rrc_at_ix() {
    setRrcFlags(memory[IX[0] + memory[PC[0] + 2]]);

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] >> 1 + (getFlag("C") << 8);
    PC[0] += 4;
}

function rrc_at_iy() {
    setRrcFlags(memory[IY[0] + memory[PC[0] + 2]]);

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] >> 1 + (getFlag("C") << 8);
    PC[0] += 4;
}

function set_b_of_r() {
    const reg = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));
    const b = (memory[PC[0] + 1] & parseInt("00111000", 2)) >> 3;

    eval(`${reg}[0] = ${reg}[0] | (1 << b);`);

    PC[0] += 2;
}

function set_b_of_at_hl() {
    const b = (memory[PC[0] + 1] & parseInt("00111000", 2)) >> 3;

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] | (1 << b);

    PC[0] += 2;
}

function set_b_of_at_ix() {
    const b = (memory[PC[0] + 3] & parseInt("00111000", 2)) >> 3;

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] | (1 << b);
    PC[0] += 4;
}

function set_b_of_at_iy() {
    const b = (memory[PC[0] + 3] & parseInt("00111000", 2)) >> 3;

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] | (1 << b);
    PC[0] += 4;
}

function res_b_of_r() {
    const reg = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));
    const b = (memory[PC[0] + 1] & parseInt("00111000", 2)) >> 3;

    eval(`${reg}[0] = ${reg}[0] & (255 ^ (1 << b));`);

    PC[0] += 2;
}

function res_b_of_at_hl() {
    const b = (memory[PC[0] + 1] & parseInt("00111000", 2)) >> 3;

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] & (255 ^ (1 << b));

    PC[0] += 2;
}

function res_b_of_at_ix() {
    const b = (memory[PC[0] + 3] & parseInt("00111000", 2)) >> 3;

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] & (255 ^ (1 << b));
    PC[0] += 4;
}

function res_b_of_at_iy() {
    const b = (memory[PC[0] + 3] & parseInt("00111000", 2)) >> 3;

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] & (255 ^ (1 << b));
    PC[0] += 4;
}

function cp_r() {
    const valToSub = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    set8bitSubFlags(A[0], valToSub);

    PC[0] += 1;
}

function cp_at_hl() {
    const valToSub = memory[(H[0] << 8) + L[0]];

    set8bitSubFlags(A[0], valToSub);

    PC[0] += 1;
}

function cp_at_ix() {
    const valToSub = memory[IX[0] + memory[PC[0] + 2]];

    set8bitSubFlags(A[0], valToSub);

    PC[0] += 3;
}

function cp_at_iy() {
    const valToSub = memory[IY[0] + memory[PC[0] + 2]];

    set8bitSubFlags(A[0], valToSub);

    PC[0] += 3;
}

function cp_v() {
    const valToSub = memory[PC[0] + 1];

    set8bitSubFlags(A[0], valToSub);

    PC[0] += 2;
}

function jp_to_mn() {
    PC[0] = memory[PC[0] + 1] + (memory[PC[0] + 2] << 8);
}

function jp_to_hl() {
    PC[0] = (H[0] << 8) + L[0];
}

function jp_to_ix() {
    PC[0] = IX[0];
}

function jp_to_iy() {
    PC[0] = IY[0];
}

function jr_j() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 
    PC[0] = temp;
}

function jp_cond_to_mn() {
    const cond = getCondFromT6Code((memory[PC[0]] & parseInt("00111000", 2)) >> 3);
    if (checkCondition(cond)) PC[0] = memory[PC[0] + 1] + (memory[PC[0] + 2] << 8);
    else PC[0] += 3;
}

function jr_C_j() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 
    if (checkCondition("C")) PC[0] = temp;
    else PC[0] += 2;
}

function jr_NC_j() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 
    if (checkCondition("NC")) PC[0] = temp;
    else PC[0] += 2;
}

function jr_Z_j() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 
    if (checkCondition("Z")) PC[0] = temp;
    else PC[0] += 2;
}

function jr_NZ_j() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 
    if (checkCondition("NZ")) PC[0] = temp;
    else PC[0] += 2;
}

function djnz() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 

    B[0] -= 1;

    if (B[0] != 0) PC[0] = temp[0];
    else PC[0] += 2;
}

function r_to_r() {
    const regDest = getRegFromT1Code((memory[PC[0]] & parseInt("00111000", 2)) >>> 3);
    const regSource = getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2));

    eval(`${regDest}[0] = ${regSource}[0]`);
    PC[0] += 1;
}

function i_to_a() {
    A[0] = I[0];

    if (A[0] == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (A[0] >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    PC[0] += 2;
}

function r_to_a() {
    A[0] = R[0];

    if (A[0] == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (A[0] >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    PC[0] += 2;
}

function a_to_i() {
    I[0] = A[0];
    PC[0] += 2;
}

function a_to_r() {
    R[0] = A[0];
    PC[0] += 2;
}

function at_bc_to_a() {
    A[0] = memory[(B[0] << 8) + C[0]];

    PC[0] += 1;
}

function at_de_to_a() {
    A[0] = memory[(D[0] << 8) + E[0]];

    PC[0] += 1;
}

function a_to_at_bc() {
    memory[(B[0] << 8) + C[0]] = A[0];

    PC[0] += 1;
}

function a_to_at_de() {
    memory[(D[0] << 8) + E[0]] = A[0];

    PC[0] += 1;
}

function at_mn_to_a() {
    A[0] = memory[memory[PC[0] + 1] + (memory[PC[0] + 2] << 8)];

    PC[0] += 3;
}

function a_to_at_mn() {
    memory[memory[PC[0] + 1] + (memory[PC[0] + 2] << 8)] = A[0];

    PC[0] += 3;
}

function at_hl_to_r() {
    const regDest = getRegFromT1Code((memory[PC[0]] & parseInt("00111000", 2)) >>> 3);

    const valueAtHL = memory[(H[0] << 8) + L[0]];
    eval(`${regDest}[0] = valueAtHL;`);

    PC[0] += 1;
}

function r_to_at_hl() {
    const regSource = getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2));

    eval(`memory[(H[0] << 8) + L[0]] = ${regSource}[0];`);

    PC[0] += 1;
}

function at_ix_to_r() {
    const regDest = getRegFromT1Code((memory[PC[0] + 1] & parseInt("00111000", 2)) >>> 3);

    const valueAtIX = memory[IX[0] + memory[PC[0] + 2]];
    eval(`${regDest}[0] = valueAtIX;`);

    PC[0] += 3;
}

function at_iy_to_r() {
    const regDest = getRegFromT1Code((memory[PC[0] + 1] & parseInt("00111000", 2)) >>> 3);

    const valueAtIY = memory[IY[0] + memory[PC[0] + 2]];
    eval(`${regDest}[0] = valueAtIY;`);

    PC[0] += 3;
}

function r_to_at_ix() {
    const regSource = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    eval(`memory[IX[0]] = ${regSource}[0];`);

    PC[0] += 3;
}

function r_to_at_iy() {
    const regSource = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    eval(`memory[IY[0]] = ${regSource}[0];`);

    PC[0] += 3;
}

function v_to_r() {
    const regDest = getRegFromT1Code((memory[PC[0]] & parseInt("00111000", 2)) >>> 3);
    const value = memory[PC[0] + 1]; 

    eval(`${regDest}[0] = ${value}`);
    PC[0] += 2;
}

function v_to_at_hl() {
    const value = memory[PC[0] + 1]; 

    memory[L[0] + (H[0] << 8)] = value;
    PC[0] += 2;
}

function v_to_at_ix() {
    const value = memory[PC[0] + 3]; 

    memory[IX[0] + memory[PC[0] + 2]] = value;

    PC[0] += 4;
}

function v_to_at_iy() {
    const value = memory[PC[0] + 3]; 

    memory[IY[0] + memory[PC[0] + 2]] = value;

    PC[0] += 4;
}

function hl_to_sp() {
    SP[0] = (H[0] << 8) + L[0];

    PC[0] += 1;
}

function ix_to_sp() {
    SP[0] = IX[0];

    PC[0] += 2;
}

function iy_to_sp() {
    SP[0] = IY[0];

    PC[0] += 2;
}

function at_mn_to_hl() {
    L[0] = memory[memory[PC[0] + 1] + (memory[PC[0] + 2] << 8)]; 

    PC[0] += 3;
}

function at_mn_to_ix() {
    IX[0] = memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)]; 

    PC[0] += 4;
}

function at_mn_to_iy() {
    IY[0] = memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)]; 

    PC[0] += 4;
}

function hl_to_at_mn() {
    memory[memory[PC[0] + 1] + (memory[PC[0] + 2] << 8)] = L[0]; 

    PC[0] += 3;
}

function ix_to_at_mn() {
    memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)] = IX[0]; 

    PC[0] += 4;
}

function iy_to_at_mn() {
    memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)] = IY[0]; 

    PC[0] += 4;
}

function at_mn_to_r() {
    const regSource = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >>> 4);

    eval(`memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)] = ${regSource}[0];`);
    PC[0] += 4;
}

function r_to_at_mn() {
    const regDest = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >>> 4);

    regDest[0] = memory[memory[PC[0] + 2]] + (memory[PC[0] + 3] << 8);

    PC[0] += 4;
}

function mn_to_ix() {
    IX[0] = memory[PC[0] + 2] + (memory[PC[0] + 3] << 8);

    PC[0] += 4;
}

function mn_to_iy() {
    IY[0] = memory[PC[0] + 2] + (memory[PC[0] + 3] << 8);

    PC[0] += 4;
}

function mn_to_r() {
    const regDest = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >>> 4);

    if (regDest == "SP") SP[0] = memory[PC[0] + 1] + (memory[PC[0] + 2] << 8);
    else if (regDest == "HL") {
        H[0] = memory[PC[0] + 2];
        L[0] = memory[PC[0] + 1];
    }
    else eval(`${regDest}[0] = memory[PC[0] + 1] + (memory[PC[0] + 2] << 8);`);  

    PC[0] += 3;
}

function push_r() {
    const regToPush = getRegFromT2Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4);

    eval(`memory[SP[0] - 1] = ${regToPush[0]}[0]`); 
    eval(`memory[SP[0] - 2] = ${regToPush[1]}[0]`); 
    SP[0] -= 2;

    PC[0] += 1;
}

function push_ix() {
    memory[SP[0] - 1] = (IX[0] & parseInt("1111111100000000", 2)) >> 8;
    memory[SP[0] - 2] = IX[0] & parseInt("11111111", 2);

    SP[0] -= 2;

    PC[0] += 2;
}


function push_iy() {
    memory[SP[0] - 1] = (IY[0] & parseInt("1111111100000000", 2)) >> 8;
    memory[SP[0] - 2] = IY[0] & parseInt("11111111", 2);

    SP[0] -= 2;

    PC[0] += 2;
}

function pop_r() {
    const regToPopTo = getRegFromT2Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4);

    eval(`${regToPopTo[0]}[0] = memory[SP[0] + 1]`); 
    eval(`${regToPopTo[1]}[0] = memory[SP[0]];`); 
    SP[0] += 2;

    PC[0] += 1;
}

function pop_ix() {
    IX[0] = (memory[SP[0] + 1] << 8) + memory[SP[0]];

    SP[0] += 2;

    PC[0] += 2;
}


function pop_iy() {
    IY[0] = (memory[SP[0] + 1] << 8) + memory[SP[0]];

    SP[0] += 2;

    PC[0] += 2;
}

function call() {
    let returnDir = PC[0] + 3;
    memory[SP[0] - 1] = (returnDir & parseInt("1111111100000000", 2)) >> 8;
    memory[SP[0] - 2] = returnDir & parseInt("11111111", 2);

    PC[0] = (memory[PC[0] + 2] << 8) + memory[PC[0] + 1];

    SP[0] -= 2;
}

function ret() {
    PC[0] = (memory[SP[0] + 1] << 8) + memory[SP[0]];

    SP[0] += 2;
}

