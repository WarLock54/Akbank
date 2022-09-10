using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AkbankWebPracticum
{
    abstract class Arac
    {
        Arac arac;
        public int HGSNO { get; set; }
        public string İsim { get; set; }
        public string Soyisim { get; set; }
        public decimal Bakiye { get; set; }
        public DateTime Zaman { get; set; }
        public Arac(int _HGSNO, string _İsim, string _Soyisim)
        {
            HGSNO = _HGSNO;
            İsim = _İsim;
            Soyisim = _Soyisim;
            Zaman = DateTime.Now;
         
        }
        public abstract string GecisParaUcreti();
        public override string ToString()
        {
           // DateTime.Parse(Zaman);
            StringBuilder str = new StringBuilder();
            str.Append($"{İsim} {Soyisim} {HGSNO} lu kisi  zaman: { Zaman} ");
            return str.ToString();
        }



    }
    class Otomobil : Arac
    {
        private List<Otomobil> Otomobils;
        public Otomobil(int _HGSNO, string _İsim, string _Soyisim) : base(_HGSNO, _İsim, _Soyisim)
        {
           
        }
        public override string GecisParaUcreti()
        {
                
                this.Bakiye=100;
            return "Otomobil vasitasiyla gittiginiz icin" + this.Bakiye;
        }

      

        public override string ToString()
        {
            StringBuilder str = new StringBuilder();
            str.Append(base.ToString());
            str.Append($" ucret : {this.GecisParaUcreti()}");
       return str.ToString();
        }

    }
    class Minubus : Arac
    {
        public Minubus(int _HGSNO, string _İsim, string _Soyisim) : base(_HGSNO, _İsim, _Soyisim)
        {

        }
        public override string GecisParaUcreti()
        {
            this.Bakiye = 250;
            return "Minubus vasitasiyla gittiginiz icin" + this.Bakiye;
        }

       
        public override string ToString()
        {
            StringBuilder str = new StringBuilder();
            str.Append(base.ToString());
            str.Append($" ucret : {this.GecisParaUcreti()}");
            return str.ToString();
        }

    }
    class Otobus : Arac
    {
        public Otobus(int _HGSNO, string _İsim, string _Soyisim) : base(_HGSNO, _İsim, _Soyisim)
        {

        }
        public override string GecisParaUcreti()
        {
            this.Bakiye = 500;
            return "Otobus vasitasiyla gittiginiz icin" + this.Bakiye;
        }

        public override string ToString()
        {
            StringBuilder str = new StringBuilder();
            str.Append(base.ToString());
            str.Append($" ucret : {this.GecisParaUcreti()}");
            return str.ToString();
        }

    }

}
