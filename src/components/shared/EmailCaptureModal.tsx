import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Download, CheckCircle, Mail } from "lucide-react";

interface EmailCaptureModalProps {
  trigger?: React.ReactNode;
}

const EmailCaptureModal = ({ trigger }: EmailCaptureModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const generateICSContent = () => {
    const events = [
      { date: "20260415", title: "Q1 2026 Quarterly Tax Due", desc: "Pay estimated taxes for Jan-Mar 2026" },
      { date: "20260615", title: "Q2 2026 Quarterly Tax Due", desc: "Pay estimated taxes for Apr-May 2026" },
      { date: "20260915", title: "Q3 2026 Quarterly Tax Due", desc: "Pay estimated taxes for Jun-Aug 2026" },
      { date: "20270115", title: "Q4 2026 Quarterly Tax Due", desc: "Pay estimated taxes for Sep-Dec 2026" },
    ];

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MoneyGrowTools//Quarterly Tax Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:2026 Quarterly Tax Deadlines
`;

    events.forEach((event, index) => {
      icsContent += `BEGIN:VEVENT
UID:mgt-${index}-${event.date}@moneygrowtools.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART;VALUE=DATE:${event.date}
DTEND;VALUE=DATE:${event.date}
SUMMARY:${event.title}
DESCRIPTION:${event.desc}
STATUS:CONFIRMED
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:${event.title} - Due in 7 days
TRIGGER:-P7D
END:VALARM
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:${event.title} - Due in 1 day
TRIGGER:-P1D
END:VALARM
END:VEVENT
`;
    });

    icsContent += "END:VCALENDAR";
    return icsContent;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Store email (would send to backend in production)
    console.log("Email captured:", email);
    localStorage.setItem("mgt_subscriber_email", email);

    // Generate and download .ics file
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "2026-quarterly-tax-deadlines.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsSubmitted(true);
  };

  const defaultTrigger = (
    <Button variant="outline" className="gap-2">
      <Calendar className="w-4 h-4" />
      Get Tax Deadline Calendar
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Calendar className="w-5 h-5 text-primary" />
            2026 Quarterly Tax Calendar
          </DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Never miss a quarterly tax deadline again. Get an .ics calendar file with all 2026 due dates and automatic reminders.
            </p>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>All 4 quarterly deadlines for 2026</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>7-day and 1-day reminders built in</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Works with Apple, Google & Outlook</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="email" className="sr-only">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Calendar (.ics)
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                We'll send you tax tips occasionally. Unsubscribe anytime.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Download Started!</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Your calendar file is downloading. Open it to add the events to your calendar.
              </p>
            </div>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmailCaptureModal;
