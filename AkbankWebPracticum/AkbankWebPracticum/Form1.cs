using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace AkbankWebPracticum
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
          
             Otomobil otomobil = new Otomobil(1,"ONUR","ATALİK");
            MessageBox.Show(otomobil.ToString());
            Minubus minubus = new Minubus(2, "elif", "Simsek");
            Otobus otobus = new Otobus(3, "HAKAN", "KUPLU");
        }
    }
}
