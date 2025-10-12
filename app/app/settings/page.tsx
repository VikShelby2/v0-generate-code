import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Key, Trash2 } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Billing */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <CreditCard className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Billing & Subscription</h3>
                <p className="text-sm text-muted-foreground">Manage your plan and payment methods</p>
              </div>
            </div>
            <Badge variant="secondary">Creator+</Badge>
          </div>

          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-muted-foreground">Creator+ - $9/month</p>
              </div>
              <Button variant="outline" size="sm">
                Change Plan
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <p className="font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground">•••• •••• •••• 4242</p>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <p className="font-medium">Next Billing Date</p>
                <p className="text-sm text-muted-foreground">February 15, 2025</p>
              </div>
            </div>
          </div>
        </Card>

        {/* API Keys */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Key className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">API Access</h3>
                <p className="text-sm text-muted-foreground">Integrate StoryCloner with your apps</p>
              </div>
            </div>
            <Badge variant="secondary">Agency Only</Badge>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              API access is available on the Agency plan. Upgrade to get programmatic access to clone creation and
              content generation.
            </p>
            <Button className="mt-4 bg-transparent" variant="outline" size="sm">
              Upgrade to Agency
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 bg-card border-destructive/20">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Danger Zone</h3>
              <p className="text-sm text-muted-foreground">Irreversible actions for your account</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-destructive">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
