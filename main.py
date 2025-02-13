timeStart = 0
boolBegin = False
debut2 = 0
debut = 0

#Permet de géré les moteur plus facilement entre -255 et 255
def Motors(Mx1, Mx2):
    #géré le dépassement de la vitesse physique maximale
    if -255 < Mx1 < 255 and -255 < Mx2 < 255:
        if Mx1 > 0:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, Mx1)
        else:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, -(Mx1))
        
        if Mx2 > 0:
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, Mx2)
        else:
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, -(Mx2))
    else:
        if Mx1 > 0:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
        else:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, -(255))
                
        if Mx2 > 0:
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
        else:
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, -(255))


def on_forever():
    global debut2, timeStart, boolBegin
    debut2 = pins.digital_read_pin(DigitalPin.P0)
    if input.button_is_pressed(Button.A) or debut2 != 0 and not (boolBegin):
        timeStart = control.millis()
        boolBegin = True
        basic.show_leds("""
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
            """)
    if boolBegin:
        elapsedTime = control.millis() - timeStart
        if 10000 <= elapsedTime and elapsedTime <= 20000:
            if maqueen.ultrasonic() >= 5:
                # Continue à avancer si pas d'obstacle
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 200)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 200)
            else:
                # Arrête le robot s'il y a un obstacle
                maqueen.motor_stop(maqueen.Motors.ALL)
        elif 20000 > elapsedTime and elapsedTime > 30000:
            # Arrêt définitif après 100 secondes
            maqueen.motor_stop(maqueen.Motors.ALL)
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 200)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            basic.show_leds("""
                . . . . .
                . . . . .
                . # # # .
                . . . . .
                . . . . .
                """)
basic.forever(on_forever)
