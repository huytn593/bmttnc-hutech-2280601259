from PyQt5 import QtCore, QtGui, QtWidgets
import os

os.environ['QT_QPA_PLATFORM_PLUGIN_PATH'] = "../platforms"

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(800, 600)
        MainWindow.setStyleSheet("""
            QMainWindow {
                background-color: #1e1e2f;
            }
            QLabel {
                color: #f8f8f2;
                font-family: 'Segoe UI';
            }
            QPlainTextEdit, QTextEdit {
                background-color: #2e2e3e;
                color: #f8f8f2;
                border-radius: 6px;
                padding: 6px;
                font-family: 'Consolas';
            }
            QPushButton {
                background-color: #61afef;
                color: white;
                border-radius: 8px;
                font-weight: bold;
                font-size: 14px;
                padding: 8px 16px;
            }
            QPushButton:hover {
                background-color: #528ccf;
            }
        """)

        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")

        # Layouts
        self.main_layout = QtWidgets.QVBoxLayout(self.centralwidget)
        self.main_layout.setContentsMargins(30, 20, 30, 20)
        self.main_layout.setSpacing(20)

        self.title = QtWidgets.QLabel("🛡️  Caesar Cipher Tool")
        font = QtGui.QFont("Segoe UI", 20, QtGui.QFont.Bold)
        self.title.setFont(font)
        self.title.setAlignment(QtCore.Qt.AlignCenter)
        self.main_layout.addWidget(self.title)

        self.subtitle = QtWidgets.QLabel("By TranPhamGiaHuy - 2280601259")
        font = QtGui.QFont("Segoe UI", 12)
        self.subtitle.setFont(font)
        self.subtitle.setAlignment(QtCore.Qt.AlignCenter)
        self.main_layout.addWidget(self.subtitle)

        # Plain text input
        self.label_plain = QtWidgets.QLabel("Plain Text")
        self.main_layout.addWidget(self.label_plain)
        self.plainTextEdit = QtWidgets.QPlainTextEdit()
        self.main_layout.addWidget(self.plainTextEdit)

        # Key input
        self.label_key = QtWidgets.QLabel("Key (number)")
        self.main_layout.addWidget(self.label_key)
        self.textEdit = QtWidgets.QTextEdit()
        self.textEdit.setMaximumHeight(40)
        self.main_layout.addWidget(self.textEdit)

        # Cipher text output
        self.label_cipher = QtWidgets.QLabel("Cipher Text")
        self.main_layout.addWidget(self.label_cipher)
        self.textEdit_2 = QtWidgets.QTextEdit()
        self.main_layout.addWidget(self.textEdit_2)

        # Buttons
        self.button_layout = QtWidgets.QHBoxLayout()
        self.pushButton = QtWidgets.QPushButton("🔐 Encrypt")
        self.pushButton_2 = QtWidgets.QPushButton("🔓 Decrypt")
        self.button_layout.addWidget(self.pushButton)
        self.button_layout.addStretch()
        self.button_layout.addWidget(self.pushButton_2)
        self.main_layout.addLayout(self.button_layout)

        MainWindow.setCentralWidget(self.centralwidget)

        # Menu and Status Bar
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 22))
        MainWindow.setMenuBar(self.menubar)

        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

        # Center the window
        qr = MainWindow.frameGeometry()
        cp = QtWidgets.QDesktopWidget().availableGeometry().center()
        qr.moveCenter(cp)
        MainWindow.move(qr.topLeft())

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "Caesar Cipher UI"))

# Run the application
if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())