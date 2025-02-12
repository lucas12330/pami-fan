debut = 0
boolBegin = False
timeStart = 0

def on_forever():
    global timeStart, boolBegin

    debut = pins.digital_read_pin(DigitalPin.P0)
    if debut != 0 and not boolBegin:
        timeStart = control.millis()
        boolBegin = True
        basic.show_leds("""
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        """)

    if boolBegin:
        elapsedTime = control.millis() - timeStart
        if 85000 <= elapsedTime <= 100000:
            if maqueen.ultrasonic() >= 5:  # Continue à avancer si pas d'obstacle
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 200)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            else:  # Arrête le robot s'il y a un obstacle
                maqueen.motor_stop(maqueen.Motors.ALL)
        elif elapsedTime > 100000:  # Arrêt définitif après 100 secondes
            maqueen.motor_stop(maqueen.Motors.ALL)
            boolBegin = False
            basic.show_leds("""
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            """)

basic.forever(on_forever)
